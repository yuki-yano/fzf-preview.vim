import { USE_DEV_ICONS_PATTERN_LIMIT } from "@/const/fzf-resource"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import { execSyncCommand } from "@/system/command"
import type { ResourceLines } from "@/type"

type Options = {
  enableConvertForFzf: boolean
  enableDevIcons: boolean
  enablePostProcessCommand: boolean
}

const postProcessFileName = (lines: ResourceLines): ResourceLines => {
  const postProcessCommand = globalVariableSelector("fzfPreviewFilelistPostProcessCommand") as string

  if (postProcessCommand === "" || lines.length === 0) {
    return lines
  }

  const command = `echo "${lines.map((line) => line.displayText).join("\n")}" | ${postProcessCommand}`

  const { stdout, stderr, status } = execSyncCommand(command)

  if (stderr !== "" || status !== 0) {
    throw new Error(`Failed post process command: ${postProcessCommand}`)
  }
  const files = stdout.split("\n").filter((line) => line !== "")

  return lines.map((line, i) => ({
    ...line,
    text: files[i],
  }))
}

const createDevIconsList = (files: Array<string>) => {
  const defaultIcon = globalVariableSelector("webDevIconsUnicodeDecorateFileNodesDefaultSymbol") as string
  const extensionIcons = globalVariableSelector("webDevIconsUnicodeDecorateFileNodesExtensionSymbols") as {
    [key: string]: string
  }
  const exactIcons = globalVariableSelector("webDevIconsUnicodeDecorateFileNodesExactSymbols") as {
    [key: string]: string
  }
  const patternIcons = globalVariableSelector("webDevIconsUnicodeDecorateFileNodesPatternSymbols") as {
    [key: string]: string
  }

  return files.map((file) => {
    if (USE_DEV_ICONS_PATTERN_LIMIT > files.length) {
      for (const [regexp, icon] of Object.entries(patternIcons)) {
        if (new RegExp(regexp).exec(file)) {
          return icon
        }
      }
    }

    if (exactIcons[file.toLowerCase()] != null) {
      return exactIcons[file.toLowerCase()]
    }

    const extension = file.split(".").slice(-1)[0]
    return extensionIcons[extension] != null ? extensionIcons[extension] : defaultIcon
  })
}

export const convertForFzf = (lines: ResourceLines, options: Options): ResourceLines => {
  const { enableConvertForFzf, enableDevIcons, enablePostProcessCommand } = options

  if (!enableConvertForFzf) {
    return lines
  }

  const postProcessedLines = enablePostProcessCommand ? postProcessFileName(lines) : lines

  if (enableDevIcons) {
    const convertedTexts = postProcessedLines.map(
      // eslint-disable-next-line no-control-regex
      (line) => line.displayText.replace(/\x1b\[[0-9;]*m/g, "").split(":")[0]
    )
    const icons = createDevIconsList(convertedTexts)

    return lines.map((line, i) => ({
      data: line.data,
      displayText: `${icons[i]}  ${postProcessedLines[i].displayText}`,
    }))
  }

  return postProcessedLines
}

import { USE_DEV_ICONS_PATTERN_LIMIT } from "@/const/fzf-resource"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import { execCommand } from "@/system/command"
import type { ResourceLines } from "@/type"

type Options = {
  enableConvertForFzf: boolean
  enableDevIcons: boolean
  enablePostProcessCommand: boolean
}

const postProcessFileName = (files: Array<string>) => {
  const postProcessCommand = globalVariableSelector("fzfPreviewFilelistPostProcessCommand") as string

  if (postProcessCommand === "" || files.length === 0) {
    return files
  }

  const command = `echo "${files.join("\n")}" | ${postProcessCommand}`

  const { stdout, stderr, status } = execCommand(command)

  if (stderr !== "" || status !== 0) {
    throw new Error(`Failed post process command: ${postProcessCommand}`)
  }

  return stdout.split("\n").filter((line) => line !== "")
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
    // eslint-disable-next-line no-control-regex
    const files = postProcessedLines.map((line) => line.replace(/\x1b\[[0-9;]*m/g, "").split(":")[0])
    const icons = createDevIconsList(files)

    return postProcessedLines.map((line, i) => `${icons[i]}  ${line}`)
  }

  return postProcessedLines
}

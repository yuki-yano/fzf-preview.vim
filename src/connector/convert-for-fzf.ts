import { USE_DEV_ICONS_PATTERN_LIMIT } from "@/const/fzf-resource"
import { colorizeDevIcon } from "@/fzf/syntax/colorize"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import { execSyncCommand } from "@/system/command"
import type { ColorizeFunc, ResourceLine, ResourceLines } from "@/type"

type Options = {
  enableConvertForFzf: boolean
  enableDevIcons: boolean
  enablePostProcessCommand: boolean
  colorizeFunc?: (line: string) => string
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

const colorizeLine = ({ data, displayText }: ResourceLine, colorizeFunc: ColorizeFunc): ResourceLine => {
  return {
    data,
    displayText: colorizeFunc(displayText),
  }
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
  const { enableConvertForFzf, enableDevIcons, enablePostProcessCommand, colorizeFunc } = options

  if (!enableConvertForFzf) {
    return lines
  }

  const postProcessedLines = enablePostProcessCommand ? postProcessFileName(lines) : lines
  const colorizedLines =
    colorizeFunc != null ? postProcessedLines.map((line) => colorizeLine(line, colorizeFunc)) : postProcessedLines

  if (enableDevIcons) {
    const convertedTexts = colorizedLines.map(
      // eslint-disable-next-line no-control-regex
      (line) => line.displayText.replace(/\x1b\[[0-9;]*m/g, "").split(":")[0]
    )
    const icons = createDevIconsList(convertedTexts).map((icon) => colorizeDevIcon(icon))

    return lines.map((line, i) => ({
      data: line.data,
      displayText: `${icons[i]}  ${colorizedLines[i].displayText}`,
    }))
  }

  return colorizedLines
}

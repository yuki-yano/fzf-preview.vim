import { USE_DEV_ICONS_PATTERN_LIMIT } from "@/const/fzf-resource"
import { colorizeDevIcon } from "@/fzf/syntax/colorize"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import type { ColorizeFunc, ResourceLine, ResourceLines } from "@/type"

type Options = {
  enableConvertForFzf: boolean
  enableDevIcons: boolean
  colorizeFunc?: (line: string) => string
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
  const { enableConvertForFzf, enableDevIcons, colorizeFunc } = options

  if (!enableConvertForFzf) {
    return lines
  }

  const colorizedLines = colorizeFunc != null ? lines.map((line) => colorizeLine(line, colorizeFunc)) : lines

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

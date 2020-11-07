import stripAnsi from "strip-ansi"

import { USE_DEV_ICONS_PATTERN_LIMIT } from "@/const/fzf-resource"
import { colorizeDevIcon } from "@/fzf/syntax/colorize"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import type { ResourceLines } from "@/type"

type Options = {
  enableConvertForFzf: boolean
  enableDevIcons: boolean
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
  const { enableConvertForFzf, enableDevIcons } = options

  if (!enableConvertForFzf) {
    return lines
  }

  if (enableDevIcons) {
    const convertedTexts = lines.map((line) => stripAnsi(line.displayText).split(":")[0])
    const icons = createDevIconsList(convertedTexts).map((icon) => colorizeDevIcon(icon))

    return lines.map((line, i) => {
      const lineNumber = line.data.lineNumber != null ? `${line.data.lineNumber} ` : ""

      return {
        data: line.data,
        displayText: `${lineNumber}${icons[i]}  ${line.displayText}`,
      }
    })
  } else {
    return lines.map((line) => {
      const lineNumber = line.data.lineNumber != null ? `${line.data.lineNumber} ` : ""

      return {
        data: line.data,
        displayText: `${lineNumber}${line.displayText}`,
      }
    })
  }
}

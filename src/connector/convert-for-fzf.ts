import stripAnsi from "strip-ansi"
import type { ReadonlyDeep } from "type-fest"

import { USE_DEV_ICONS_PATTERN_LIMIT } from "@/const/fzf-resource"
import { colorizeDevIcon } from "@/fzf/syntax/colorize"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import type { ResourceLines } from "@/type"

type Options = ReadonlyDeep<{
  enableConvertForFzf: boolean
  enableDevIcons: boolean
}>

const createDevIconsList = (files: ReadonlyArray<string>): ReadonlyArray<string> => {
  const defaultIcon = globalVariableSelector("webDevIconsUnicodeDecorateFileNodesDefaultSymbol") as string
  const extensionIcons = globalVariableSelector("webDevIconsUnicodeDecorateFileNodesExtensionSymbols") as {
    [key: string]: string | undefined
  }
  const exactIcons = globalVariableSelector("webDevIconsUnicodeDecorateFileNodesExactSymbols") as {
    [key: string]: string | undefined
  }
  const patternIcons = globalVariableSelector("webDevIconsUnicodeDecorateFileNodesPatternSymbols") as {
    [key: string]: string | undefined
  }

  return files.map((file) => {
    if (USE_DEV_ICONS_PATTERN_LIMIT > files.length) {
      for (const [regexp, icon] of Object.entries(patternIcons)) {
        if (icon == null) {
          throw new Error("Unexpected pattern icon")
        }

        if (new RegExp(regexp).exec(file)) {
          return icon
        }
      }
    }

    const exactFile = exactIcons[file.toLowerCase()]
    if (exactFile != null) {
      return exactFile
    }

    const extension = file.split(".").slice(-1)[0]

    const extensionIcon = extensionIcons[extension]

    return extensionIcon != null ? extensionIcon : defaultIcon
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

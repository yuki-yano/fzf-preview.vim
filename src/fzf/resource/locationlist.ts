import { getLocationList } from "@/connector/quickfix-and-locationlist"
import { colorize, colorizeFile } from "@/fzf/syntax/colorize"
import { parseQuickFixAndLocationListLine } from "@/fzf/util"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import type { FzfCommandDefinitionDefaultOption, Resource, ResourceLines, SourceFuncArgs } from "@/type"

export const locationList = async (_args: SourceFuncArgs): Promise<Resource> => {
  const resourceLines: ResourceLines = (await getLocationList()).map((line) => {
    const { fileName, lineNumber, text } = parseQuickFixAndLocationListLine(line)

    return {
      data: {
        command: "FzfPreviewLocationList",
        type: "line",
        file: fileName,
        text,
        lineNumber,
      },
      displayText: `${colorizeFile(fileName)}:${colorize(lineNumber.toString(), "green")}:${text}`,
    }
  })

  return {
    type: "json",
    lines: resourceLines,
  }
}

const previewCommand = () => {
  const grepPreviewCommand = globalVariableSelector("fzfPreviewGrepPreviewCmd") as string

  return `"${grepPreviewCommand} {3..}"`
}

export const locationListDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"LocationList> "',
  "--multi": true,
  "--preview": previewCommand(),
  "--preview-window": '"+{2}-10"',
  "--with-nth": '"3.."',
})

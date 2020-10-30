import { getMarks } from "@/connector/marks"
import { colorize, colorizeFile } from "@/fzf/syntax/colorize"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import type { FzfCommandDefinitionDefaultOption, Resource, ResourceLines, SourceFuncArgs } from "@/type"

export const marks = async (_args: SourceFuncArgs): Promise<Resource> => {
  const resourceLines: ResourceLines = (await getMarks()).map(({ file, line, text }) => ({
    data: {
      command: "FzfPreviewMarks",
      type: "line",
      file,
      text,
      lineNumber: Number(line),
    },
    displayText: `${colorizeFile(file)}:${colorize(line, "green")}:${text}`,
  }))

  return {
    type: "json",
    lines: resourceLines,
  }
}

const previewCommand = () => {
  const grepPreviewCommand = globalVariableSelector("fzfPreviewGrepPreviewCmd") as string

  return `"${grepPreviewCommand} {3..}"`
}

export const marksDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"Marks> "',
  "--multi": true,
  "--preview": previewCommand(),
  "--preview-window": '"+{2}-10"',
  "--with-nth": '"3.."',
})

import { getBuffers } from "@/connector/buffers"
import { colorize, colorizeFile } from "@/fzf/syntax/colorize"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import { readFile } from "@/system/file"
import type { FzfCommandDefinitionDefaultOption, Resource, ResourceLines, SourceFuncArgs } from "@/type"

export const bufferLines = async (_args: SourceFuncArgs): Promise<Resource> => {
  const buffers = await getBuffers()

  const lines = buffers.reduce((acc: ResourceLines, cur) => {
    const fileLines = readFile(cur.fileName)
      .split("\n")
      .map((line, lineIndex) => ({
        lineNumber: lineIndex + 1,
        text: line,
      }))
      .slice(0, -1)

    const resourceLines: ResourceLines = fileLines.map((line) => ({
      data: {
        command: "FzfPreviewBufferLines",
        type: "line",
        file: cur.fileName,
        text: line.text,
        lineNumber: line.lineNumber,
      },
      displayText: `${colorizeFile(cur.fileName)}:${colorize(line.lineNumber.toString(), "green")}:${line.text}`,
    }))

    return [...acc, ...resourceLines]
  }, [])

  return {
    type: "json",
    lines,
  }
}

const previewCommand = () => {
  const grepPreviewCommand = globalVariableSelector("fzfPreviewGrepPreviewCmd") as string

  return `"${grepPreviewCommand} {}"`
}

export const bufferLinesDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"BufferLines> "',
  "--multi": true,
  "--preview": previewCommand(),
  "--preview-window": '"+{2}-10"',
  "--with-nth": '"3.."',
})

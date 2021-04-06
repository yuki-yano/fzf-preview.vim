import { execMemoListFiles } from "@/connector/memolist"
import { colorizeFile } from "@/fzf/syntax/colorize"
import { filePreviewCommand } from "@/fzf/util"
import type { FzfCommandDefinitionDefaultOption, Resource } from "@/type"

export const memoList = async (): Promise<Resource> => {
  const lines = await execMemoListFiles()

  return {
    type: "json",
    lines: lines.map((line) => ({
      data: {
        command: "FzfPreviewMemoList",
        type: "file",
        file: line,
      },
      displayText: colorizeFile(line),
    })),
  }
}

export const memoListDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"MemoList> "',
  "--multi": true,
  "--preview": filePreviewCommand(),
  "--keep-right": true,
})

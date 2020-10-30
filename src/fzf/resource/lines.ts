import stripAnsi from "strip-ansi"

import { execLines } from "@/connector/lines"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import { existsFileAsync, getCurrentFilePath } from "@/system/file"
import type { FzfCommandDefinitionDefaultOption, Resource, SourceFuncArgs } from "@/type"

export const lines = async (_args: SourceFuncArgs): Promise<Resource> => {
  const currentFile = await getCurrentFilePath()
  if (!(await existsFileAsync(currentFile))) {
    return {
      type: "json",
      lines: [],
    }
  }

  const lineList = await execLines(currentFile)

  return {
    type: "json",
    lines: lineList.map((line) => {
      const result = /^\s*(?<lineNumber>\d+)\s(?<text>.*)/.exec(stripAnsi(line))
      if (result?.groups == null) {
        throw new Error(`Unexpected line format: ${line}`)
      }

      return {
        data: {
          command: "FzfPreviewLines",
          type: "line",
          file: currentFile,
          text: result.groups.text,
          lineNumber: Number(result.groups.lineNumber),
        },
        displayText: line,
      }
    }),
  }
}

const previewCommand = async () => {
  const grepPreviewCommand = globalVariableSelector("fzfPreviewGrepPreviewCmd") as string

  return `"${grepPreviewCommand} ${await getCurrentFilePath()}:{2}"`
}

export const linesDefaultOptions = async (): Promise<FzfCommandDefinitionDefaultOption> => ({
  "--prompt": '"Lines> "',
  "--multi": true,
  "--preview": await previewCommand(),
  "--preview-window": '"+{2}-10"',
  "--with-nth": '"3.."',
})

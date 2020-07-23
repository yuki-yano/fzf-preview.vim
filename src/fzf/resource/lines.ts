import { execLines } from "@/connector/lines"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import { currentFilePath, existsFileAsync } from "@/system/file"
import type { FzfCommandDefinitionDefaultOption, Resource, SourceFuncArgs } from "@/type"

export const lines = async (_args: SourceFuncArgs): Promise<Resource> => {
  const currentFile = await currentFilePath()
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
      // eslint-disable-next-line no-control-regex
      const result = /^\s*(?<lineNumber>\d+)\s(?<text>.*)/.exec(line.replace(/\x1b\[[0-9;]*m/g, ""))
      if (result == null || result.groups == null) {
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
  return `"${grepPreviewCommand} ${await currentFilePath()}:{2}"`
}

export const linesDefaultOptions = async (): Promise<FzfCommandDefinitionDefaultOption> => ({
  "--prompt": '"Lines> "',
  "--multi": true,
  "--preview": await previewCommand(),
})

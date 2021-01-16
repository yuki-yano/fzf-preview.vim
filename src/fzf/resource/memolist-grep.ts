import stripAnsi from "strip-ansi"

import { execMemoListGrep } from "@/connector/memolist"
import { colorize, colorizeFile } from "@/fzf/syntax/colorize"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import type { FzfCommandDefinitionDefaultOption, Resource, SourceFuncArgs } from "@/type"

export const memoListGrep = async (args: SourceFuncArgs): Promise<Resource> => {
  const grepArgs = args.args.join(" ")
  const lines = await execMemoListGrep(grepArgs)

  return {
    type: "json",
    lines: lines.map((line) => {
      const [file, lineNumber, ...rest] = line.split(":")

      return {
        data: {
          command: "FzfPreviewProjectGrep",
          type: "line",
          file: stripAnsi(file),
          lineNumber: Number(stripAnsi(lineNumber)),
          text: stripAnsi(rest.join(":")),
        },
        displayText: `${colorizeFile(file)}:${colorize(lineNumber, "green")}: ${rest.join(":")}`,
      }
    }),
    options: { "--header": `'[Grep from] ${grepArgs}'` },
  }
}

const previewCommand = () => {
  const grepPreviewCommand = globalVariableSelector("fzfPreviewGrepPreviewCmd") as string

  return `"${grepPreviewCommand} {3..}"`
}

export const memoListGrepDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"MemoListGrep> "',
  "--multi": true,
  "--preview": previewCommand(),
  "--preview-window": '"+{2}-10"',
  "--with-nth": '"3.."',
})

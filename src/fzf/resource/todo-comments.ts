import stripAnsi from "strip-ansi"

import { execSearchTodoComments } from "@/connector/todo-comments"
import { colorize, colorizeFile } from "@/fzf/syntax/colorize"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import type { FzfCommandDefinitionDefaultOption, Resource } from "@/type"

export const todoComments = async (): Promise<Resource> => {
  const lines = await execSearchTodoComments()

  return {
    type: "json",
    lines: lines.map((line) => {
      const [file, lineNumber, ...rest] = line.split(":")

      return {
        data: {
          command: "FzfPreviewTodoComments",
          type: "line",
          file: stripAnsi(file),
          lineNumber: Number(stripAnsi(lineNumber)),
          text: stripAnsi(rest.join(":")),
        },
        displayText: `${colorizeFile(file)}:${colorize(lineNumber, "green")}: ${rest.join(":")}`,
      }
    }),
  }
}

const previewCommand = () => {
  const grepPreviewCommand = globalVariableSelector("fzfPreviewGrepPreviewCmd") as string

  return `"${grepPreviewCommand} {3..}"`
}

export const todoCommentsDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"TodoComments> "',
  "--multi": true,
  "--preview": previewCommand(),
  "--preview-window": '"+{2}-10"',
  "--with-nth": '"3.."',
})

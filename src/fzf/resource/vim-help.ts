import stripAnsi from "strip-ansi"

import { execHelpTags } from "@/connector/vim-help"
import { colorize, colorizeFile } from "@/fzf/syntax/colorize"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import { collapseHome } from "@/system/file"
import type { FzfCommandDefinitionDefaultOption, Resource, SourceFuncArgs } from "@/type"

export const grepHelp = async (args: SourceFuncArgs): Promise<Resource> => {
  const helpTagsArgs = args.args.length > 0 ? args.args.join(" ") : "."
  const lines = await execHelpTags(helpTagsArgs)

  return {
    type: "json",
    lines: lines.map((line) => {
      const [file, lineNumber, ...rest] = line.split(":")

      return {
        data: {
          command: "FzfPreviewGrepHelp",
          type: "line",
          file: stripAnsi(file),
          lineNumber: Number(stripAnsi(lineNumber)),
          text: stripAnsi(rest.join(":")),
        },
        displayText: `${colorizeFile(collapseHome(file.split("/").slice(-1).join("/")))}:${colorize(
          lineNumber,
          "green"
        )}: ${rest.join(":")}`,
      }
    }),
    options: { "--header": `'[Search from] ${helpTagsArgs}'` },
  }
}

const previewCommand = () => {
  const grepPreviewCommand = globalVariableSelector("fzfPreviewGrepPreviewCmd") as string

  return `"${grepPreviewCommand} {3..}"`
}

export const grepHelpDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"GrepHelp> "',
  "--multi": true,
  "--preview": previewCommand(),
  "--preview-window": '"+{2}-10"',
  "--with-nth": '"3.."',
})

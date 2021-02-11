import fs from "fs"
import stripAnsi from "strip-ansi"

import { execGrep } from "@/connector/grep"
import { colorize, colorizeFile } from "@/fzf/syntax/colorize"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import type { FzfCommandDefinitionDefaultOption, Resource, ResourceLine, SourceFuncArgs } from "@/type"

import { resourceLineToFzfLine } from "../../plugin/fzf-runner"
import { execAsyncCommand } from "../../system/command"

export const projectGrep = async (args: SourceFuncArgs): Promise<Resource> => {
  const grepArgs = args.args.join(" ")
  // const lines = await execGrep(grepArgs)
  const grepCommand = globalVariableSelector("fzfPreviewGrepCmd") as string
  const lines = await execAsyncCommand(`${grepCommand} ${grepArgs}`)

  fs.open("/tmp/fzf-preview-grep", "a", (err, fd) => {
    if (err) throw err

    for (const line of lines.stdout.split("\n")) {
      const [file, lineNumber, ...rest] = line.split(":")

      const writeData: Resource["lines"][number] = {
        data: {
          command: "FzfPreviewProjectGrep",
          type: "line",
          file: stripAnsi(file),
          lineNumber: Number(stripAnsi(lineNumber)),
          text: stripAnsi(rest.join(":")),
        },
        displayText: `${colorizeFile(file)}:${colorize(lineNumber, "green")}: ${rest.join(":")}`,
      }

      const converted: ResourceLine = {
        data: writeData.data,
        displayText: `${lineNumber}${writeData.displayText}`,
      } as const

      console.warn(converted)
      console.warn(resourceLineToFzfLine(converted))

      fs.appendFile(fd, `${resourceLineToFzfLine(converted)}\n`, (e) => {
        console.error(e)
      })
    }

    fs.close(fd, (e) => {
      console.error(e)
    })
  })

  return {
    type: "json",
    lines: [],
    options: { "--header": `'[Grep from] ${grepArgs}'` },
  }
}

const previewCommand = () => {
  const grepPreviewCommand = globalVariableSelector("fzfPreviewGrepPreviewCmd") as string

  return `"${grepPreviewCommand} {3..}"`
}

export const projectGrepDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"ProjectGrep> "',
  "--multi": true,
  "--preview": previewCommand(),
  "--preview-window": '"+{2}-10"',
  "--with-nth": '"3.."',
})

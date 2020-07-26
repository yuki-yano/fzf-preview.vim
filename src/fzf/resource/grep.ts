import { execGrep } from "@/connector/grep"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import type { FzfCommandDefinitionDefaultOption, Resource, SourceFuncArgs } from "@/type"

export const projectGrep = async (args: SourceFuncArgs): Promise<Resource> => {
  const grepArgs = args.args.join(" ")
  const lines = await execGrep(grepArgs)
  return {
    type: "json",
    lines: lines.map((line) => {
      const [file, lineNumber, ...rest] = line.split(":")

      /* eslint-disable no-control-regex */
      return {
        data: {
          command: "FzfPreviewProjectGrep",
          type: "line",
          file: file.replace(/\x1b\[[0-9;]*m/g, ""),
          lineNumber: Number(lineNumber.replace(/\x1b\[[0-9;]*m/g, "")),
          text: rest.join(":").replace(/\x1b\[[0-9;]*m/g, ""),
        },
        displayText: `${file}:${lineNumber}: ${rest.join(":")}`,
      }
      /* eslint-enable no-control-regex */
    }),
    options: { "--header": `"[Grep from] ${grepArgs}"` },
  }
}

const previewCommand = () => {
  const grepPreviewCommand = globalVariableSelector("fzfPreviewGrepPreviewCmd") as string
  return `"${grepPreviewCommand} {2..}"`
}

export const projectGrepDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"ProjectGrep> "',
  "--multi": true,
  "--preview": previewCommand(),
})

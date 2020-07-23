import { execGrep } from "@/connector/grep"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import type { FzfCommandDefinitionDefaultOption, Resource, SourceFuncArgs } from "@/type"

export const projectGrep = async (args: SourceFuncArgs): Promise<Resource> => {
  const grepArgs = args.args.join(" ")
  const lines = await execGrep(grepArgs)
  return {
    type: "json",
    lines: lines.map((line) => ({
      data: {
        command: "FzfPreviewProjectGrep",
        type: "line",
        file: line.split(":")[0],
        lineNumber: Number(line.split(":")[1]),
        text: line.split(":")[2],
      },
      displayText: line,
    })),
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

import { execGrep } from "@/connector/grep"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import type { FzfCommandDefinitionDefaultOption, Resource, SourceFuncArgs } from "@/type"

export const projectGrep = async (args: SourceFuncArgs): Promise<Resource> => {
  const grepArgs = args.args.join(" ")
  const lines = await execGrep(grepArgs)
  return {
    lines,
    options: { "--header": `"Grep from: ${grepArgs}"` },
  }
}

const previewCommand = () => {
  const grepPreviewCommand = globalVariableSelector("fzfPreviewGrepPreviewCmd") as string
  return `"${grepPreviewCommand} {}"`
}

export const projectGrepDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"ProjectGrep> "',
  "--multi": true,
  "--preview": previewCommand(),
})

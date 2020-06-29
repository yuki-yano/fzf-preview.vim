import { getJumps } from "@/connector/jumps"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import type { FzfCommandDefinitionDefaultOption, ResourceLines, SourceFuncArgs } from "@/type"

export const jumps = async (_args: SourceFuncArgs): Promise<ResourceLines> => {
  const jumpList = await getJumps()
  return jumpList
}

const previewCommand = () => {
  const grepPreviewCommand = globalVariableSelector("fzfPreviewGrepPreviewCmd") as string
  return `"${grepPreviewCommand} {}"`
}

export const jumpsDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"Jumps> "',
  "--multi": true,
  "--preview": previewCommand(),
})

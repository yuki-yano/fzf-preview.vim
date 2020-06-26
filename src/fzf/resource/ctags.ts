import { getCtags } from "@/connector/tags"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import type { FzfCommandDefinitionDefaultOption, ResourceLines, SourceFuncArgs } from "@/type"

export const ctags = async (_args: SourceFuncArgs): Promise<ResourceLines> => {
  const tagList = await getCtags()
  return tagList
}

const previewCommand = () => {
  const grepPreviewCommand = globalVariableSelector("fzfPreviewGrepPreviewCmd") as string
  return `"${grepPreviewCommand} '{-1}:{1}'"`
}

export const ctagsDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"Ctags> "',
  "--multi": true,
  "--preview": previewCommand()
})

import { getCtags } from "@/connector/tags"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import type { FzfCommandDefinitionDefaultOption, Resource, SourceFuncArgs } from "@/type"

export const ctags = async (_args: SourceFuncArgs): Promise<Resource> => {
  const tagList = await getCtags()
  return { lines: tagList }
}

const previewCommand = () => {
  const grepPreviewCommand = globalVariableSelector("fzfPreviewGrepPreviewCmd") as string
  return `"${grepPreviewCommand} '{-1}:{1}'"`
}

export const ctagsDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"Ctags> "',
  "--multi": true,
  "--preview": previewCommand(),
})

import { getMarks } from "@/connector/marks"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import type { FzfCommandDefinitionDefaultOption, ResourceLines, SourceFuncArgs } from "@/type"

export const marks = async (_args: SourceFuncArgs): Promise<ResourceLines> => {
  const markList = await getMarks()
  return markList
}

const previewCommand = () => {
  const grepPreviewCommand = globalVariableSelector("fzfPreviewGrepPreviewCmd") as string
  return `"${grepPreviewCommand} {}"`
}

export const marksDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"Marks> "',
  "--multi": true,
  "--preview": previewCommand(),
})

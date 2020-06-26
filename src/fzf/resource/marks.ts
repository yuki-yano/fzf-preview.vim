import { convertForFzf } from "@/connector/convert-for-fzf"
import { getMarks } from "@/connector/marks"
import { executeCommandSelector } from "@/module/selector/execute-command"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import type { FzfCommandDefinitionDefaultOption, ResourceLines, SourceFuncArgs } from "@/type"

export const marks = async (_args: SourceFuncArgs): Promise<ResourceLines> => {
  const markList = await getMarks()

  const { enableDevIcons } = executeCommandSelector().options
  if (enableDevIcons) {
    const convertedMarkList = await convertForFzf(markList, { disablePostProcessCommand: true })
    return convertedMarkList
  } else {
    return markList
  }
}

const previewCommand = () => {
  const grepPreviewCommand = globalVariableSelector("fzfPreviewGrepPreviewCmd") as string
  return `"${grepPreviewCommand} {}"`
}

export const marksDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"Marks> "',
  "--multi": true,
  "--preview": previewCommand()
})

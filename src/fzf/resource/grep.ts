import { convertForFzf } from "@/connector/convert-for-fzf"
import { execGrep } from "@/connector/grep"
import { executeCommandSelector } from "@/module/selector/execute-command"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import type { FzfCommandDefinitionDefaultOption, ResourceLines, SourceFuncArgs } from "@/type"

export const projectGrep = async (args: SourceFuncArgs): Promise<ResourceLines> => {
  const grepResult = execGrep(args.args.join(" "))

  const { enableDevIcons } = executeCommandSelector().options
  if (enableDevIcons) {
    const convertedGrepResult = await convertForFzf(grepResult, { disablePostProcessCommand: true })
    return convertedGrepResult
  } else {
    return grepResult
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

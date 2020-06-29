import { convertForFzf } from "@/connector/convert-for-fzf"
import { getJumps } from "@/connector/jumps"
import { executeCommandSelector } from "@/module/selector/execute-command"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import type { FzfCommandDefinitionDefaultOption, ResourceLines, SourceFuncArgs } from "@/type"

export const jumps = async (_args: SourceFuncArgs): Promise<ResourceLines> => {
  const jumpList = await getJumps()

  const { enableDevIcons } = executeCommandSelector().options
  if (enableDevIcons) {
    const convertedJumpList = await convertForFzf(jumpList, { disablePostProcessCommand: true })
    return convertedJumpList
  } else {
    return jumpList
  }
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

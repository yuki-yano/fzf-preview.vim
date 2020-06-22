import { executeCommandSelector } from "@/module/selector/execute-command"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import { getBuffers } from "@/plugin/connector/buffers"
import { convertForFzf } from "@/plugin/connector/convert-for-fzf"
import type { SourceFuncArgs } from "@/type"

export const buffers = async (_args: SourceFuncArgs) => {
  const bufferList = await getBuffers()

  const { enableDevIcons } = executeCommandSelector().options
  if (enableDevIcons) {
    const convertedBufferList = await convertForFzf(bufferList)
    return convertedBufferList
  } else {
    return bufferList
  }
}

export const buffersDefaultOptions = () => ({
  "--prompt": '"Buffers> "',
  "--multi": true,
  "--preview": `"${globalVariableSelector("fzfPreviewCommand")}"`
})

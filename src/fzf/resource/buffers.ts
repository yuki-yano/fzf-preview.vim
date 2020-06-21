import { executeCommandSelector } from "@/module/selector/execute-command"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import { pluginCall } from "@/plugin"
import type { ResourceLines, SourceFuncArgs } from "@/type"

export const buffers = async (_args: SourceFuncArgs) => {
  const bufferList = (await pluginCall("fzf_preview#remote#resource#buffers#get")) as ResourceLines

  const { enableDevIcons } = executeCommandSelector().options
  if (enableDevIcons) {
    return (await pluginCall("fzf_preview#remote#converter#convert_for_fzf", [bufferList])) as Promise<ResourceLines>
  } else {
    return bufferList
  }
}

export const buffersDefaultOptions = () => ({
  "--prompt": '"Buffers> "',
  "--multi": true,
  "--preview": `"${globalVariableSelector("fzfPreviewCommand")}"`
})

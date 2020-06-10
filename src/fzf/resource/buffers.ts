import { createExecuteCommandSelector } from "@/module/execute-command"
import { createGlobalVariableSelector } from "@/module/vim-variable"
import { pluginCall } from "@/plugin"
import { store } from "@/store"
import type { SourceFuncArgs } from "@/type"

export const buffers = async (_args: SourceFuncArgs) => {
  const bufferList = (await pluginCall("fzf_preview#remote#resource#buffers#get")) as Array<string>

  const executeCommandSelector = createExecuteCommandSelector(store)
  const { enableDevIcons } = executeCommandSelector().options
  if (enableDevIcons) {
    return (await pluginCall("fzf_preview#remote#converter#convert_for_fzf", [bufferList])) as Promise<Array<string>>
  } else {
    return bufferList
  }
}

export const buffersDefaultOptions = () => ({
  "--prompt": '"Buffers> "',
  "--multi": true,
  "--preview": `"${createGlobalVariableSelector(store)("fzfPreviewCommand")}"`
})

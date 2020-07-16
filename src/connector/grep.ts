import { globalVariableSelector } from "@/module/selector/vim-variable"
import { pluginCall } from "@/plugin"
import type { ResourceLines } from "@/type"

export const execGrep = async (args: string): Promise<ResourceLines> => {
  const grepCommand = globalVariableSelector("fzfPreviewGrepCmd") as string
  const lines = (await pluginCall("fzf_preview#remote#resource#grep#get", [`${grepCommand} ${args}`])) as ResourceLines

  return lines
}

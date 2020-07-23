import { globalVariableSelector } from "@/module/selector/vim-variable"
import { pluginCall } from "@/plugin"

export const execGrep = async (args: string): Promise<Array<string>> => {
  const grepCommand = globalVariableSelector("fzfPreviewGrepCmd") as string
  const lines = (await pluginCall("fzf_preview#remote#resource#grep#get", [`${grepCommand} ${args}`])) as Array<string>

  return lines
}

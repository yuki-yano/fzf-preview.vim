import { pluginCall } from "@/plugin"

export const setRegister = async (str: string, options: string): Promise<void> => {
  await pluginCall("fzf_preview#remote#consumer#register#set", [str, options])
}

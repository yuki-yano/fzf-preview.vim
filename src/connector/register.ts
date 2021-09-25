import { pluginCall } from "@/plugin"

export const setRegister = async (str: string, options: string): Promise<void> => {
  await pluginCall("fzf_preview#remote#consumer#register#set", [str, options])
}

export const pasteRegister = async (str: string, options: string): Promise<void> => {
  await pluginCall("fzf_preview#remote#consumer#register#paste", [str, options])
}

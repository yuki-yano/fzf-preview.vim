import { pluginCall } from "@/plugin"

export type VimCommand = {
  name: string
  number: number | null
}

export const getVimCommands = async (): Promise<Array<VimCommand>> => {
  const commands = (await pluginCall("fzf_preview#remote#resource#vim_command#commands")) as Array<VimCommand>

  return commands
}

export const getVimCommandHistory = async (): Promise<Array<VimCommand>> => {
  const commands = (await pluginCall("fzf_preview#remote#resource#vim_command#history")) as Array<VimCommand>

  return commands
}

export const execVimCommand = async (command: string): Promise<void> => {
  await pluginCall("fzf_preview#remote#resource#vim_command#exec", [command])
}

export const editVimCommand = async (command: string): Promise<void> => {
  await pluginCall("fzf_preview#remote#resource#vim_command#edit", [command])
}

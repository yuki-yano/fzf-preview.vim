import type { ReadonlyDeep } from "type-fest"

import { pluginCall } from "@/plugin"

type VimCommand = ReadonlyDeep<{
  name: string
  number: number | null
}>

export const getVimCommands = async (): Promise<ReadonlyArray<VimCommand>> => {
  const commands = (await pluginCall("fzf_preview#remote#resource#vim_command#commands")) as ReadonlyArray<VimCommand>

  return commands
}

export const getVimCommandHistory = async (): Promise<ReadonlyArray<VimCommand>> => {
  const commands = (await pluginCall("fzf_preview#remote#resource#vim_command#history")) as ReadonlyArray<VimCommand>

  return commands
}

export const execVimCommand = async (command: string): Promise<void> => {
  await pluginCall("fzf_preview#remote#resource#vim_command#exec", [command])
}

export const editVimCommand = async (command: string): Promise<void> => {
  await pluginCall("fzf_preview#remote#resource#vim_command#edit", [command])
}

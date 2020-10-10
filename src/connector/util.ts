import { pluginCall, pluginCommand } from "@/plugin"
import { execAsyncCommand } from "@/system/command"

export const vimEchoMessage = async (message: string): Promise<void> => {
  await pluginCommand(`echomsg '${message}'`)
}

export const isGitDirectory = async (): Promise<boolean> => {
  const result = (await pluginCall("fzf_preview#remote#util#is_git_directory")) as boolean

  return result
}

export const getProjectRoot = async (): Promise<string> => {
  const root = (await pluginCall("fzf_preview#remote#util#project_root")) as string

  return root
}

export const getLineFromFile = async (file: string, line: number): Promise<string> =>
  (await execAsyncCommand(`sed -n ${line}p ${file}`)).stdout.trim()

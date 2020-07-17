import { pluginCall } from "@/plugin"
import { execAsyncCommand } from "@/system/command"

export const isGitDirectory = async (): Promise<boolean> => {
  const result = (await pluginCall("fzf_preview#remote#util#is_git_directory")) as boolean
  return result
}

export const getLineFromFile = async (file: string, line: number): Promise<string> =>
  (await execAsyncCommand(`sed -n ${line}p ${file}`)).stdout.trim()

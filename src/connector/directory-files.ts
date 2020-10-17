import { globalVariableSelector } from "@/module/selector/vim-variable"
import { pluginCall } from "@/plugin"

export const execDirectoryFiles = async (args: string): Promise<Array<string>> => {
  const filelistCommand = globalVariableSelector("fzfPreviewDirectoryFilesCommand")

  if (typeof filelistCommand !== "string") {
    return []
  }

  const lines = (await pluginCall("fzf_preview#remote#resource#directory_files#get", [
    `${filelistCommand} ${args}`,
  ])) as Array<string>

  return lines
}

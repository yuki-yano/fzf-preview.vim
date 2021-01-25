import { globalVariableSelector } from "@/module/selector/vim-variable"
import { pluginCall } from "@/plugin"

export const execDirectoryFiles = async (args: string): Promise<ReadonlyArray<string>> => {
  const filelistCommand = globalVariableSelector("fzfPreviewDirectoryFilesCommand")

  if (typeof filelistCommand !== "string") {
    return []
  }

  const lines = (await pluginCall("fzf_preview#remote#resource#directory_files#get", [
    `${filelistCommand} ${args}`,
  ])) as ReadonlyArray<string>

  return lines
}

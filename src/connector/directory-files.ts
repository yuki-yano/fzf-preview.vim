import { globalVariableSelector } from "@/module/selector/vim-variable"
import { pluginCall } from "@/plugin"
import type { ResourceLines } from "@/type"

export const execDirectoryFiles = async (args: string): Promise<ResourceLines> => {
  const filelistCommand = globalVariableSelector("fzfPreviewDirectoryFilesCommand")

  if (typeof filelistCommand !== "string") {
    return []
  }

  const lines = (await pluginCall("fzf_preview#remote#resource#directory_files#get", [
    `${filelistCommand} ${args}`,
  ])) as ResourceLines

  return lines
}

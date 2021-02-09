import { globalVariableSelector } from "@/module/selector/vim-variable"
import { pluginCall } from "@/plugin"

export const execProjectFiles = async (): Promise<ReadonlyArray<string>> => {
  const filelistCommand = globalVariableSelector("fzfPreviewFilelistCommand")

  if (typeof filelistCommand !== "string") {
    return []
  }

  const lines = (await pluginCall("fzf_preview#remote#resource#project_files#get", [
    filelistCommand,
  ])) as ReadonlyArray<string>

  return lines
}

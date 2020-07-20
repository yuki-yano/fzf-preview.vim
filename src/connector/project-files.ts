import { globalVariableSelector } from "@/module/selector/vim-variable"
import { pluginCall } from "@/plugin"
import type { ResourceLines } from "@/type"

export const execProjectFiles = async (): Promise<ResourceLines> => {
  const filelistCommand = globalVariableSelector("fzfPreviewFilelistCommand")

  if (typeof filelistCommand !== "string") {
    return []
  }

  const lines = (await pluginCall("fzf_preview#remote#resource#project_files#get", [
    `${filelistCommand}`,
  ])) as ResourceLines

  return lines
}

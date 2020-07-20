import { globalVariableSelector } from "@/module/selector/vim-variable"
import { pluginCall } from "@/plugin"
import type { ResourceLines } from "@/type"

export const execLines = async (filePath: string): Promise<ResourceLines> => {
  const linesCommand = globalVariableSelector("fzfPreviewLinesCommand") as string
  if (typeof linesCommand !== "string") {
    return []
  }

  const lines = (await pluginCall("fzf_preview#remote#resource#lines#get", [
    `${linesCommand} ${filePath}`,
  ])) as ResourceLines
  return lines
}

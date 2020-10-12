import { globalVariableSelector } from "@/module/selector/vim-variable"
import { pluginCall } from "@/plugin"

export const execLines = async (filePath: string): Promise<ReadonlyArray<string>> => {
  const linesCommand = globalVariableSelector("fzfPreviewLinesCommand") as string
  if (typeof linesCommand !== "string") {
    return []
  }

  const lines = (await pluginCall("fzf_preview#remote#resource#lines#get", [
    `${linesCommand} ${filePath}`,
  ])) as ReadonlyArray<string>

  return lines
}

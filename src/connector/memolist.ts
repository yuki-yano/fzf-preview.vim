import { globalVariableSelector } from "@/module/selector/vim-variable"
import { pluginCall } from "@/plugin"

export const execMemoListFiles = async (): Promise<Array<string>> =>
  (await pluginCall("fzf_preview#remote#resource#memolist#files")) as Array<string>

export const execMemoListGrep = async (args: string): Promise<Array<string>> => {
  const grepCommand = globalVariableSelector("fzfPreviewGrepCmd") as string
  const lines = (await pluginCall("fzf_preview#remote#resource#memolist#grep", [
    `${grepCommand} ${args}`,
  ])) as Array<string>

  return lines
}

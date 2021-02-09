import { globalVariableSelector } from "@/module/selector/vim-variable"
import { pluginCall } from "@/plugin"

export const execMemoListFiles = async (): Promise<ReadonlyArray<string>> =>
  (await pluginCall("fzf_preview#remote#resource#memolist#files")) as ReadonlyArray<string>

export const execMemoListGrep = async (args: string): Promise<ReadonlyArray<string>> => {
  const grepCommand = globalVariableSelector("fzfPreviewGrepCmd") as string
  const lines = (await pluginCall("fzf_preview#remote#resource#memolist#grep", [
    `${grepCommand} ${args}`,
  ])) as ReadonlyArray<string>

  return lines
}

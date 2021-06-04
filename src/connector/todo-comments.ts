import { globalVariableSelector } from "@/module/selector/vim-variable"
import { pluginCall } from "@/plugin"

export const execSearchTodoComments = async (): Promise<ReadonlyArray<string>> => {
  const grepCommand = globalVariableSelector("fzfPreviewGrepCmd") as string
  const todoKeywords = (await pluginCall("fzf_preview#remote#resource#todo_comments#get", [])) as ReadonlyArray<string>
  const keywordsRegexp = todoKeywords.map((keyword) => `${keyword}: `).join("|")

  const grepKeywords = `${grepCommand} "${keywordsRegexp}"`
  const lines = (await pluginCall("fzf_preview#remote#resource#grep#get", [grepKeywords])) as ReadonlyArray<string>

  return lines
}

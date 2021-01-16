import { pluginCall } from "@/plugin"

export const execMemoListFiles = async (): Promise<Array<string>> =>
  (await pluginCall("fzf_preview#remote#resource#memolist#files")) as Array<string>

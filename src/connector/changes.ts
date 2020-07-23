import { pluginCall } from "@/plugin"

export const getChanges = async (): Promise<Array<string>> =>
  (await pluginCall("fzf_preview#remote#resource#changes#get")) as Array<string>

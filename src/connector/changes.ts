import { pluginCall } from "@/plugin"

export const getChanges = async (): Promise<ReadonlyArray<string>> =>
  (await pluginCall("fzf_preview#remote#resource#changes#get")) as ReadonlyArray<string>

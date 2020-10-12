import { pluginCall } from "@/plugin"

export const getQuickFix = async (): Promise<ReadonlyArray<string>> =>
  (await pluginCall("fzf_preview#remote#resource#quickfix_and_locationlist#get", ["quickfix"])) as ReadonlyArray<string>

export const getLocationList = async (): Promise<ReadonlyArray<string>> =>
  (await pluginCall("fzf_preview#remote#resource#quickfix_and_locationlist#get", ["loclist"])) as ReadonlyArray<string>

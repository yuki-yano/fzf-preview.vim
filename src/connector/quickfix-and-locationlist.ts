import { pluginCall } from "@/plugin"

export const getQuickFix = async (): Promise<Array<string>> =>
  (await pluginCall("fzf_preview#remote#resource#quickfix_and_locationlist#get", ["quickfix"])) as Array<string>

export const getLocationList = async (): Promise<Array<string>> =>
  (await pluginCall("fzf_preview#remote#resource#quickfix_and_locationlist#get", ["loclist"])) as Array<string>

import { pluginCall } from "@/plugin"
import type { ResourceLines } from "@/type"

export const getQuickFix = async (): Promise<Array<string>> =>
  (await pluginCall("fzf_preview#remote#resource#quickfix_and_locationlist#get", ["quickfix"])) as ResourceLines

export const getLocationList = async (): Promise<Array<string>> =>
  (await pluginCall("fzf_preview#remote#resource#quickfix_and_locationlist#get", ["loclist"])) as ResourceLines

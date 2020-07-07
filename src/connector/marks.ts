import { pluginCall } from "@/plugin"
import type { ResourceLines } from "@/type"

export const getMarks = async (): Promise<ResourceLines> =>
  (await pluginCall("fzf_preview#remote#resource#marks#get")) as ResourceLines

import { pluginCall } from "@/plugin"
import type { ResourceLines } from "@/type"

export const getChanges = async (): Promise<ResourceLines> =>
  (await pluginCall("fzf_preview#remote#resource#changes#get")) as ResourceLines

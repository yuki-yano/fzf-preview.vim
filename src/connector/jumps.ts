import { pluginCall } from "@/plugin"
import type { ResourceLines } from "@/type"

export const getJumps = async (): Promise<ResourceLines> =>
  (await pluginCall("fzf_preview#remote#resource#jumps#get")) as ResourceLines

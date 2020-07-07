import { pluginCall } from "@/plugin"
import type { ResourceLines } from "@/type"

export const getYankround = async (): Promise<ResourceLines> =>
  (await pluginCall("fzf_preview#remote#resource#yankround#get")) as ResourceLines

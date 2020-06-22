import { pluginCall } from "@/plugin"
import type { ResourceLines } from "@/type"

export const convertForFzf = async (lines: ResourceLines): Promise<ResourceLines> => {
  return (await pluginCall("fzf_preview#remote#converter#convert_for_fzf", [lines])) as Promise<ResourceLines>
}

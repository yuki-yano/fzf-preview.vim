import { pluginCall } from "@/plugin"
import type { ResourceLines } from "@/type"

export const convertForFzf = async (files: ResourceLines) => {
  const convertedFiles = (await pluginCall("fzf_preview#remote#converter#convert_for_fzf", [files])) as Promise<
    ResourceLines
  >
  return convertedFiles
}

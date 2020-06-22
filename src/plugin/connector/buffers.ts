import { pluginCall } from "@/plugin"
import type { ResourceLines } from "@/type"

export const getBuffers = async (): Promise<ResourceLines> => {
  return (await pluginCall("fzf_preview#remote#resource#buffers#get")) as ResourceLines
}

export const getAllBuffers = async (): Promise<ResourceLines> => {
  return (await pluginCall("fzf_preview#remote#resource#all_buffers#get")) as ResourceLines
}

import { pluginCall } from "@/plugin"
import type { ResourceLines } from "@/type"

export const getBuffers = async (): Promise<Array<string>> =>
  (await pluginCall("fzf_preview#remote#resource#buffers#get")) as ResourceLines

export const getOtherBuffers = async (): Promise<Array<string>> =>
  (await pluginCall("fzf_preview#remote#resource#buffers#get_other_buffers")) as ResourceLines

export const getAllBuffers = async (): Promise<ResourceLines> =>
  (await pluginCall("fzf_preview#remote#resource#all_buffers#get")) as ResourceLines

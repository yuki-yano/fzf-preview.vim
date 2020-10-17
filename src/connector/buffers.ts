import { pluginCall, pluginCommand } from "@/plugin"
import type { VimBuffer } from "@/type"

export const getBuffers = async (): Promise<Array<VimBuffer>> => {
  const buffers = (await pluginCall("fzf_preview#remote#resource#buffers#get")) as Array<VimBuffer>

  return buffers
}

export const getCurrentBuffer = async (): Promise<VimBuffer> => {
  const buffer = (await pluginCall("fzf_preview#remote#resource#buffers#get_current_buffer")) as VimBuffer

  return buffer
}

export const getAlternateBuffer = async (): Promise<VimBuffer> => {
  const buffer = (await pluginCall("fzf_preview#remote#resource#buffers#get_alternate_buffer")) as VimBuffer

  return buffer
}

export const getOtherBuffers = async (): Promise<Array<VimBuffer>> => {
  const buffers = (await pluginCall("fzf_preview#remote#resource#buffers#get_other_buffers")) as Array<VimBuffer>

  return buffers
}

export const getAllBuffers = async (): Promise<Array<VimBuffer>> => {
  const buffers = (await pluginCall("fzf_preview#remote#resource#all_buffers#get")) as Array<VimBuffer>

  return buffers
}

export const deleteBuffer = async (bufnr: string): Promise<void> => {
  await pluginCommand(`bdelete! ${bufnr}`)
}

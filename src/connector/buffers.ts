import { pluginCall } from "@/plugin"
import type { ResourceLines, VimBuffer } from "@/type"

const lineToVimBuffer = (line: string): VimBuffer => {
  const splitted = line.split(" ")
  if (splitted[0] === "+") {
    return { fileName: splitted[1], modified: true }
  } else {
    return { fileName: splitted[0], modified: false }
  }
}

export const getBuffers = async (): Promise<Array<VimBuffer>> => {
  const lines = (await pluginCall("fzf_preview#remote#resource#buffers#get")) as ResourceLines
  return lines.map((line) => lineToVimBuffer(line))
}

export const getOtherBuffers = async (): Promise<Array<VimBuffer>> => {
  const lines = (await pluginCall("fzf_preview#remote#resource#buffers#get_other_buffers")) as ResourceLines
  return lines.map((line) => lineToVimBuffer(line))
}

export const getAllBuffers = async (): Promise<ResourceLines> =>
  (await pluginCall("fzf_preview#remote#resource#all_buffers#get")) as ResourceLines

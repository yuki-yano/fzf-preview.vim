import { getAllBuffers } from "@/connector/buffers"
import { filePreviewCommand } from "@/fzf/util"
import type { FzfCommandDefinitionDefaultOption, Resource, SourceFuncArgs } from "@/type"
import { alignLists } from "@/util/align"

const SPACER = "  "

export const allBuffers = async (_args: SourceFuncArgs): Promise<Resource> => {
  const buffers = await getAllBuffers()

  const alignedBuffers = alignLists(buffers.map((buffer) => [`[${buffer.bufnr}]`, buffer.fileName]))
  const lines = alignedBuffers.map((list) => list.join(SPACER).trim())

  return { lines }
}

export const allBuffersDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"AllBuffers> "',
  "--multi": true,
  "--preview": filePreviewCommand(),
})

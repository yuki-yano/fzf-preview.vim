import { getAllBuffers } from "@/connector/buffers"
import { filePreviewCommand } from "@/fzf/util"
import type { FzfCommandDefinitionDefaultOption, Resource, SourceFuncArgs } from "@/type"
import { alignLists } from "@/util/align"

const SPACER = "  "

export const allBuffers = async (_args: SourceFuncArgs): Promise<Resource> => {
  const buffers = await getAllBuffers()

  const displayLines = alignLists(buffers.map((buffer) => [`[${buffer.bufnr}]`, buffer.fileName])).map((list) =>
    list.join(SPACER).trim()
  )

  return {
    type: "json",
    lines: buffers.map((buffer, i) => ({
      data: {
        command: "FzfPreviewAllBuffers",
        type: "buffer",
        file: buffer.fileName,
        bufnr: buffer.bufnr,
      },
      displayText: displayLines[i],
    })),
  }
}

export const allBuffersDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"AllBuffers> "',
  "--multi": true,
  "--preview": filePreviewCommand(),
})

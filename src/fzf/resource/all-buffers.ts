import { getAllBuffers } from "@/connector/buffers"
import { colorize, colorizeFile } from "@/fzf/syntax/colorize"
import { filePreviewCommand } from "@/fzf/util"
import type { FzfCommandDefinitionDefaultOption, Resource, SourceFuncArgs } from "@/type"
import { alignLists } from "@/util/align"

const SPACER = "  "

// Colorize after align
// If it contains ansi escape, it will not align well
const colorizeArrayedBuffer = (list: Array<string>): string => {
  const [bufnr, fileName] = list

  return [colorize(bufnr, "blue"), colorizeFile(fileName)].join(SPACER).trim()
}

export const allBuffers = async (_args: SourceFuncArgs): Promise<Resource> => {
  const buffers = await getAllBuffers()

  const displayLines = alignLists(buffers.map((buffer) => [`[${buffer.bufnr}]`, buffer.fileName])).map((list) =>
    colorizeArrayedBuffer(list)
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
  "--keep-right": true,
})

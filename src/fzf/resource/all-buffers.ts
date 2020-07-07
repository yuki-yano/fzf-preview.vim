import { getAllBuffers } from "@/connector/buffers"
import { createSplitConverter } from "@/fzf/converter"
import { filePreviewCommand } from "@/fzf/util"
import type {
  ConvertedLine,
  FzfCommandDefinitionDefaultOption,
  ResourceLines,
  SelectedLine,
  SourceFuncArgs,
} from "@/type"
import { alignLists } from "@/util/align"

const SPACER = "  "

export const allBuffers = async (_args: SourceFuncArgs): Promise<ResourceLines> => {
  const allBufferList = await getAllBuffers()

  const alignedAllBufferLists = alignLists(allBufferList.map((buffer) => buffer.split(" ")))
  return alignedAllBufferLists.map((list) => list.join(SPACER).trim())
}

export const extractBufnrAndAddPrefix = (line: SelectedLine): ConvertedLine =>
  `buffer ${createSplitConverter(" ")(line)[0]}`

export const allBuffersDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"AllBuffers> "',
  "--multi": true,
  "--preview": filePreviewCommand(),
})

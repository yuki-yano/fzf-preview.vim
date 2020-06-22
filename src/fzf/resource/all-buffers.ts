import { createSplitConverter } from "@/fzf/converter"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import { getAllBuffers } from "@/plugin/connector/buffers"
import type {
  ConvertedLine,
  FzfCommandDefinitionDefaultOption,
  ResourceLines,
  SelectedLine,
  SourceFuncArgs
} from "@/type"
import { alignLists } from "@/util/align"

const SPACER = "  "

export const allBuffers = async (_args: SourceFuncArgs): Promise<ResourceLines> => {
  const allBufferList = await getAllBuffers()

  const alignedAllBufferLists = alignLists(allBufferList.map((buffer) => buffer.split(" ")))
  return alignedAllBufferLists.map((list) => list.join(SPACER).trim())
}

export const dropBufnr = (line: SelectedLine): ConvertedLine => createSplitConverter(" ")(line).pop() as string

export const allBuffersDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"AllBuffers> "',
  "--multi": true,
  "--preview": `"${globalVariableSelector("fzfPreviewCommand") as string}"`
})

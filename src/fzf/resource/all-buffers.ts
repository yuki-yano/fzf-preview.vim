import { createSplitConverter } from "@/fzf/converter"
import { createGlobalVariableSelector } from "@/module/vim-variable"
import { pluginCall } from "@/plugin"
import { store } from "@/store"
import type { SelectedLine, SourceFuncArgs } from "@/type"
import { alignLists } from "@/util/align"

const SPACER = "  "

export const allBuffers = async (_args: SourceFuncArgs) => {
  const allBufferList = (await pluginCall("fzf_preview#remote#resource#all_buffers#get")) as Array<string>

  const alignedAllBufferLists = alignLists(allBufferList.map((buffer) => buffer.split(" ")))
  return alignedAllBufferLists.map((list) => list.join(SPACER).trim())
}

export const dropBufnr = (line: SelectedLine) => createSplitConverter(" ")(line).pop() as string

export const allBuffersDefaultOptions = () => ({
  "--prompt": '"AllBuffers> "',
  "--multi": true,
  "--preview": `"${createGlobalVariableSelector(store)("fzfPreviewCommand")}"`
})

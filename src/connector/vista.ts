import type { ReadonlyDeep } from "type-fest"

import { pluginCall } from "@/plugin"

export type VistaTag = ReadonlyDeep<{
  lineNumber: number
  kind: string
  text: string
  tagFile: string
}>

export type VistaBufferTag = ReadonlyDeep<{
  lineNumber: number
  kind: string
  text: string
  line: string
}>

export const getVistaCtags = async (): Promise<ReadonlyArray<VistaTag>> => {
  const tags = (await pluginCall("fzf_preview#remote#resource#vista#ctags")) as ReadonlyArray<VistaTag>

  return tags
}

export const getVistaBufferCtags = async (): Promise<ReadonlyArray<VistaBufferTag>> => {
  const tags = (await pluginCall("fzf_preview#remote#resource#vista#buffer_ctags")) as ReadonlyArray<VistaBufferTag>

  return tags
}

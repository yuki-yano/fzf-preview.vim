import { pluginCall } from "@/plugin"

export type VistaTag = {
  lineNumber: number
  kind: string
  text: string
  tagFile: string
}

export type VistaBufferTag = {
  lineNumber: number
  kind: string
  text: string
  line: string
}

export const getVistaCtags = async (): Promise<ReadonlyArray<VistaTag>> => {
  const tags = (await pluginCall("fzf_preview#remote#resource#vista#ctags")) as ReadonlyArray<VistaTag>

  return tags
}

export const getVistaBufferCtags = async (): Promise<ReadonlyArray<VistaBufferTag>> => {
  const tags = (await pluginCall("fzf_preview#remote#resource#vista#buffer_ctags")) as ReadonlyArray<VistaBufferTag>

  return tags
}

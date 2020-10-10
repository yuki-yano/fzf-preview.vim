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

export const getVistaCtags = async (): Promise<Array<VistaTag>> => {
  const tags = (await pluginCall("fzf_preview#remote#resource#vista#ctags")) as Array<VistaTag>

  return tags
}

export const getVistaBufferCtags = async (): Promise<Array<VistaBufferTag>> => {
  const tags = (await pluginCall("fzf_preview#remote#resource#vista#buffer_ctags")) as Array<VistaBufferTag>

  return tags
}

import { pluginCall } from "@/plugin"

type Tag = {
  name: string
  file: string
  line: string
  type: string
}

export const getCtags = async (): Promise<Array<Tag>> =>
  (await pluginCall("fzf_preview#remote#resource#tags#ctags")) as Array<Tag>

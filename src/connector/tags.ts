import type { ReadonlyDeep } from "type-fest"

import { pluginCall } from "@/plugin"

type Tag = ReadonlyDeep<{
  name: string
  file: string
  line: string
  type: string
}>

export const getCtags = async (): Promise<ReadonlyArray<Tag>> =>
  (await pluginCall("fzf_preview#remote#resource#tags#ctags")) as ReadonlyArray<Tag>

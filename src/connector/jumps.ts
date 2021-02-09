import type { ReadonlyDeep } from "type-fest"

import { pluginCall } from "@/plugin"

type Jump = ReadonlyDeep<{
  file: string
  line: string
  text: string
}>

export const getJumps = async (): Promise<ReadonlyArray<Jump>> =>
  (await pluginCall("fzf_preview#remote#resource#jumps#get")) as ReadonlyArray<Jump>

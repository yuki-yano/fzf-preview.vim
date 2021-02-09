import type { ReadonlyDeep } from "type-fest"

import { pluginCall } from "@/plugin"

type YankHistory = ReadonlyDeep<{
  line: number
  text: string
  option: string
}>

export const getYankround = async (): Promise<ReadonlyArray<YankHistory>> =>
  (await pluginCall("fzf_preview#remote#resource#yankround#get")) as ReadonlyArray<YankHistory>

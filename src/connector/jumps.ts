import { pluginCall } from "@/plugin"

type Jump = {
  file: string
  line: string
  text: string
}

export const getJumps = async (): Promise<Array<Jump>> =>
  (await pluginCall("fzf_preview#remote#resource#jumps#get")) as Array<Jump>

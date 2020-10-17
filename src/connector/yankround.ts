import { pluginCall } from "@/plugin"

type YankHistory = {
  line: number
  text: string
  option: string
}

export const getYankround = async (): Promise<Array<YankHistory>> =>
  (await pluginCall("fzf_preview#remote#resource#yankround#get")) as Array<YankHistory>

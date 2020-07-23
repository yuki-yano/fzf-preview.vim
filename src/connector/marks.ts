import { pluginCall } from "@/plugin"

type Mark = {
  file: string
  line: string
  text: string
}

export const getMarks = async (): Promise<Array<Mark>> =>
  (await pluginCall("fzf_preview#remote#resource#marks#get")) as Array<Mark>

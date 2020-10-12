import { pluginCall } from "@/plugin"

type Mark = {
  file: string
  line: string
  text: string
}

export const getMarks = async (): Promise<ReadonlyArray<Mark>> =>
  (await pluginCall("fzf_preview#remote#resource#marks#get")) as ReadonlyArray<Mark>

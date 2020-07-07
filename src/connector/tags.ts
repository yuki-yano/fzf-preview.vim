import { pluginCall } from "@/plugin"
import type { ResourceLines } from "@/type"

export const getCtags = async (): Promise<ResourceLines> =>
  (await pluginCall("fzf_preview#remote#resource#tags#ctags")) as ResourceLines

import { pluginCall } from "@/plugin"
import type { ResourceLines } from "@/type"

export const getBookmarks = async (): Promise<ResourceLines> =>
  (await pluginCall("fzf_preview#remote#resource#bookmarks#get")) as ResourceLines

import type { ReadonlyDeep } from "type-fest"

import { pluginCall } from "@/plugin"

type Bookmark = ReadonlyDeep<{
  file: string
  line: string
  text: string
  comment: string
}>

export const getBookmarks = async (): Promise<ReadonlyArray<Bookmark>> =>
  (await pluginCall("fzf_preview#remote#resource#bookmarks#get")) as ReadonlyArray<Bookmark>

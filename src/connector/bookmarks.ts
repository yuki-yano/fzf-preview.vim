import { pluginCall } from "@/plugin"

type Bookmark = {
  file: string
  line: string
  text: string
  comment: string
}

export const getBookmarks = async (): Promise<Array<Bookmark>> =>
  (await pluginCall("fzf_preview#remote#resource#bookmarks#get")) as Array<Bookmark>

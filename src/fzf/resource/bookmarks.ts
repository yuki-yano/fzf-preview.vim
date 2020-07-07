import { getBookmarks } from "@/connector/bookmarks"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import type { FzfCommandDefinitionDefaultOption, ResourceLines, SourceFuncArgs } from "@/type"

export const bookmarks = async (_args: SourceFuncArgs): Promise<ResourceLines> => {
  const bookmarkList = await getBookmarks()
  return bookmarkList
}

const previewCommand = () => {
  const grepPreviewCommand = globalVariableSelector("fzfPreviewGrepPreviewCmd") as string
  return `"${grepPreviewCommand} {}"`
}

export const bookmarksDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"Bookmarks> "',
  "--multi": true,
  "--preview": previewCommand(),
})

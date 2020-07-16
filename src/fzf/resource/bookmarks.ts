import { getBookmarks } from "@/connector/bookmarks"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import type { FzfCommandDefinitionDefaultOption, Resource, SourceFuncArgs } from "@/type"

export const bookmarks = async (_args: SourceFuncArgs): Promise<Resource> => {
  const bookmarkList = await getBookmarks()
  return { lines: bookmarkList }
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

import { getBookmarks } from "@/connector/bookmarks"
import { colorize, colorizeFile } from "@/fzf/syntax/colorize"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import type { FzfCommandDefinitionDefaultOption, Resource, ResourceLines, SourceFuncArgs } from "@/type"

export const bookmarks = async (_args: SourceFuncArgs): Promise<Resource> => {
  const resourceLines: ResourceLines = (await getBookmarks()).map(({ file, line, text, comment }) => {
    return {
      data: {
        command: "FzfPreviewBookmarks",
        type: "line",
        file,
        text,
        lineNumber: Number(line),
      },
      displayText: `${colorizeFile(file)}:${colorize(line, "green")}:${text}:${comment}`,
    }
  })

  return {
    type: "json",
    lines: resourceLines,
  }
}

const previewCommand = () => {
  const grepPreviewCommand = globalVariableSelector("fzfPreviewGrepPreviewCmd") as string

  return `"${grepPreviewCommand} {}"`
}

export const bookmarksDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"Bookmarks> "',
  "--multi": true,
  "--preview": previewCommand(),
  "--preview-window": '"+{2}-10"',
  "--with-nth": '"3.."',
})

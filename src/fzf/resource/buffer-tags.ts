import { globalVariableSelector } from "@/module/selector/vim-variable"
import { currentFilePath, existsFile } from "@/system/file"
import { getBufferTags } from "@/system/tags"
import type { FzfCommandDefinitionDefaultOption, ResourceLines, SourceFuncArgs } from "@/type"
import { alignLists } from "@/util/align"

const SPACER = "  "

export const bufferTags = async (_args: SourceFuncArgs): Promise<ResourceLines> => {
  if (!existsFile(await currentFilePath())) {
    return []
  }

  const file = await currentFilePath()
  const parsedTags = getBufferTags(file)
    .map((line) => /^(?<tagName>[^\t]+)\t(?<tagFile>\S+)\t(?<lineNumber>\d+);"\t(?<tagField>.+)/.exec(line))
    .filter((match): match is RegExpExecArray => match != null && "groups" in match)
    .map((match) => {
      const { tagName, lineNumber, tagField } = match.groups as {
        tagName: string
        tagFile: string
        lineNumber: string
        tagField: string
      }
      return [lineNumber, tagName, tagField]
    })
    .sort((a, b) => Number(a[0]) - Number(b[0]))

  return alignLists(parsedTags).map((tag) => tag.join(SPACER).trim())
}

const previewCommand = async () => {
  const grepPreviewCommand = globalVariableSelector("fzfPreviewGrepPreviewCmd") as string
  return `"${grepPreviewCommand} ${await currentFilePath()}:{}"`
}

export const bufferTagsDefaultOptions = async (): Promise<FzfCommandDefinitionDefaultOption> => ({
  "--prompt": '"BufferTags> "',
  "--multi": true,
  "--preview": await previewCommand()
})

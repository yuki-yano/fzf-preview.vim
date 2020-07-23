import { globalVariableSelector } from "@/module/selector/vim-variable"
import { currentFilePath, existsFileAsync } from "@/system/file"
import { getBufferTags } from "@/system/tags"
import type { FzfCommandDefinitionDefaultOption, Resource, SourceFuncArgs } from "@/type"
import { alignLists } from "@/util/align"

const SPACER = "  "

export const bufferTags = async (_args: SourceFuncArgs): Promise<Resource> => {
  if (!(await existsFileAsync(await currentFilePath()))) {
    return {
      type: "json",
      lines: [],
    }
  }

  const file = await currentFilePath()
  const parsedTags = getBufferTags(file)
    .map((line) => /^(?<tagName>[^\t]+)\t(?<tagFile>\S+)\t(?<lineNumber>\d+);"\t(?<tagField>.+)/.exec(line))
    .filter((match): match is RegExpExecArray => match != null && "groups" in match)
    .map((match) => {
      return match.groups as {
        tagName: string
        tagFile: string
        lineNumber: string
        tagField: string
      }
    })
    .sort((a, b) => Number(a.lineNumber) - Number(b.lineNumber))

  const currentFile = await currentFilePath()
  const textList = alignLists(
    parsedTags.map(({ lineNumber, tagName, tagField }) => [lineNumber, tagName, tagField])
  ).map((tagArray) => tagArray.join(SPACER).trim())

  return {
    type: "json",
    lines: parsedTags.map((tag, i) => ({
      data: {
        command: "FzfPreviewBufferTags",
        type: "line",
        file: currentFile,
        text: textList[i],
        lineNumber: Number(tag.lineNumber),
      },
      displayText: textList[i],
    })),
  }
}

const previewCommand = async () => {
  const grepPreviewCommand = globalVariableSelector("fzfPreviewGrepPreviewCmd") as string
  return `"${grepPreviewCommand} ${await currentFilePath()}:{2..}"`
}

export const bufferTagsDefaultOptions = async (): Promise<FzfCommandDefinitionDefaultOption> => ({
  "--prompt": '"BufferTags> "',
  "--multi": true,
  "--preview": await previewCommand(),
})

import type { VistaBufferTag } from "@/connector/vista"
import { getVistaBufferCtags } from "@/connector/vista"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import { getCurrentFilePath } from "@/system/file"
import type { FzfCommandDefinitionDefaultOption, Resource, ResourceLines, SourceFuncArgs } from "@/type"
import { alignLists } from "@/util/align"

const SPACER = "  "

const vistaBufferTagToArray = ({ lineNumber, kind, text, line }: VistaBufferTag) => [
  lineNumber.toString(),
  `[${kind}]`,
  text,
  line,
]

export const vistaBufferCtags = async (_args: SourceFuncArgs): Promise<Resource> => {
  const tags = await getVistaBufferCtags()
  const displayTextList = alignLists(
    tags.sort((a, b) => a.lineNumber - b.lineNumber).map((tag) => vistaBufferTagToArray(tag))
  ).map((tag) => tag.join(SPACER).trim())

  const currentFile = await getCurrentFilePath()
  const resourceLines: ResourceLines = tags.map((tag, i) => ({
    data: {
      command: "FzfPreviewVistaBufferCtags",
      type: "line",
      file: currentFile,
      lineNumber: tag.lineNumber,
      text: displayTextList[i],
    },
    displayText: `${displayTextList[i]}`,
  }))

  return {
    type: "json",
    lines: resourceLines,
  }
}

const previewCommand = async () => {
  const grepPreviewCommand = globalVariableSelector("fzfPreviewGrepPreviewCmd") as string

  return `"${grepPreviewCommand} '${await getCurrentFilePath()}:{2}'"`
}

export const vistaBufferCtagsDefaultOptions = async (): Promise<FzfCommandDefinitionDefaultOption> => ({
  "--prompt": '"VistaBufferCtags> "',
  "--multi": true,
  "--preview": await previewCommand(),
  "--preview-window": '"+{2}-10"',
  "--with-nth": '"3.."',
})

import type { VistaTag } from "@/connector/vista"
import { getVistaCtags } from "@/connector/vista"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import type { FzfCommandDefinitionDefaultOption, Resource, ResourceLines, SourceFuncArgs } from "@/type"
import { alignLists } from "@/util/align"

const SPACER = "  "

const vistaTagToArray = ({ lineNumber, kind, text }: VistaTag) => [lineNumber.toString(), `[${kind}]`, text]

export const vistaCtags = async (_args: SourceFuncArgs): Promise<Resource> => {
  const tags = await getVistaCtags()
  const displayTextList = alignLists(tags.map((tag) => vistaTagToArray(tag))).map((tag) => tag.join(SPACER).trim())
  const resourceLines: ResourceLines = tags.map((tag, i) => ({
    data: {
      command: "FzfPreviewVistaCtags",
      type: "line",
      file: tag.tagFile,
      lineNumber: tag.lineNumber,
      text: displayTextList[i],
    },
    displayText: `${displayTextList[i]}${SPACER}${tag.tagFile}`,
  }))

  return {
    type: "json",
    lines: resourceLines,
  }
}

const previewCommand = () => {
  const grepPreviewCommand = globalVariableSelector("fzfPreviewGrepPreviewCmd") as string

  return `"${grepPreviewCommand} '{-1}:{2}'"`
}

export const vistaCtagsDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"VistaCtags> "',
  "--multi": true,
  "--preview": previewCommand(),
  "--preview-window": '"+{2}-10"',
  "--with-nth": '"2.."',
})

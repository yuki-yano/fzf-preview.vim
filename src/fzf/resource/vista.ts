import { zip } from "lodash"

import { getVistaCtags, VistaTag } from "@/connector/vista"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import type { FzfCommandDefinitionDefaultOption, Resource, SourceFuncArgs } from "@/type"
import { alignLists } from "@/util/align"

const SPACER = "  "

const vistaTagToArray = ({ lineNumber, kind, text }: VistaTag) => [lineNumber.toString(), `[${kind}]`, text]

export const vistaCtags = async (_args: SourceFuncArgs): Promise<Resource> => {
  const tags = await getVistaCtags()
  const tagArray = tags.map((tag) => vistaTagToArray(tag))
  const files = tags.map(({ tagFile }) => tagFile)

  const alignedLines = alignLists(tagArray).map((tag) => tag.join(SPACER).trim())

  return {
    lines: zip(alignedLines, files).map(([line, file]) => {
      return `${line as string}${SPACER}${file as string}`
    }),
  }
}

const previewCommand = () => {
  const grepPreviewCommand = globalVariableSelector("fzfPreviewGrepPreviewCmd") as string
  return `"${grepPreviewCommand} '{-1}:{1}'"`
}

export const vistaCtagsDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"VistaCtags> "',
  "--multi": true,
  "--preview": previewCommand(),
})

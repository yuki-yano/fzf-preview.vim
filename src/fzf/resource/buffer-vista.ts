import { getVistaBufferCtags, VistaBufferTag } from "@/connector/vista"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import { currentFilePath } from "@/system/file"
import type { FzfCommandDefinitionDefaultOption, Resource, SourceFuncArgs } from "@/type"
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
  const tagArray = tags.sort((a, b) => a.lineNumber - b.lineNumber).map((tag) => vistaBufferTagToArray(tag))

  return { lines: alignLists(tagArray).map((tag) => tag.join(SPACER).trim()) }
}

const previewCommand = async () => {
  const grepPreviewCommand = globalVariableSelector("fzfPreviewGrepPreviewCmd") as string
  return `"${grepPreviewCommand} '${await currentFilePath()}:{1}'"`
}

export const vistaBufferCtagsDefaultOptions = async (): Promise<FzfCommandDefinitionDefaultOption> => ({
  "--prompt": '"VistaBufferCtags> "',
  "--multi": true,
  "--preview": await previewCommand(),
})

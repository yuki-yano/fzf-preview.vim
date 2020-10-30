import { getCtags } from "@/connector/tags"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import type { FzfCommandDefinitionDefaultOption, Resource, SourceFuncArgs } from "@/type"

export const ctags = async (_args: SourceFuncArgs): Promise<Resource> => {
  const tagList = await getCtags()

  return {
    type: "json",
    lines: tagList.map((tag) => ({
      data: {
        command: "FzfPreviewCtags",
        type: "line",
        file: tag.file,
        text: `${tag.line} ${tag.name} ${tag.type} ${tag.file}`,
        lineNumber: Number(tag.line),
      },
      displayText: `${tag.line} ${tag.name} ${tag.type} ${tag.file}`,
    })),
  }
}

const previewCommand = () => {
  const grepPreviewCommand = globalVariableSelector("fzfPreviewGrepPreviewCmd") as string

  return `"${grepPreviewCommand} '{-1}:{2}'"`
}

export const ctagsDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"Ctags> "',
  "--multi": true,
  "--preview": previewCommand(),
  "--preview-window": '"+{2}-10"',
  "--with-nth": '"2.."',
})

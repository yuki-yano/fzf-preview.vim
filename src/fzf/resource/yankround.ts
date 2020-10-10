import { getYankround } from "@/connector/yankround"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import type { FzfCommandDefinitionDefaultOption, Resource, ResourceLines, SourceFuncArgs } from "@/type"

export const yankround = async (_args: SourceFuncArgs): Promise<Resource> => {
  const yankHistories = await getYankround()
  const resourceLines: ResourceLines = yankHistories.map(({ line, option, text }) => ({
    data: {
      command: "FzfPreviewYankround",
      type: "register",
      lineNumber: line,
      option,
      text,
    },
    displayText: `${line} ${option} ${text}`,
  }))

  return {
    type: "json",
    lines: resourceLines,
  }
}

const previewCommand = () => {
  const yankroundPreviewCommand = globalVariableSelector("fzfPreviewYankroundPreviewCommand") as string
  const historyFile = `${globalVariableSelector("yankroundDir") as string}/history`

  return `"${yankroundPreviewCommand} ${historyFile} {2}"`
}

export const yankroundDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"Yankround> "',
  "--preview": previewCommand(),
  "--no-sort": true,
  "--with-nth": "4..",
})

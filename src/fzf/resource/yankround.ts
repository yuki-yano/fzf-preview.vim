import { getYankround } from "@/connector/yankround"
import { createSplitConverter } from "@/fzf/converter"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import type {
  ConvertedLine,
  FzfCommandDefinitionDefaultOption,
  ResourceLines,
  SelectedLine,
  SourceFuncArgs,
} from "@/type"

export const yankround = async (_args: SourceFuncArgs): Promise<ResourceLines> => {
  const lines = await getYankround()
  return lines
}

export const dropYankroundLineNumber = (line: SelectedLine): ConvertedLine =>
  createSplitConverter(" ")(line).slice(1).join(" ")

const previewCommand = () => {
  const yankroundPreviewCommand = globalVariableSelector("fzfPreviewYankroundPreviewCommand") as string
  return `"${yankroundPreviewCommand} {1}"`
}

export const yankroundDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"Yankround> "',
  "--multi": false,
  "--preview": previewCommand(),
  "--no-sort": true,
  "--with-nth": "3..",
})

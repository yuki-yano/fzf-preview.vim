import { getDefinition } from "@/connector/coc"
import { colorize, colorizeFile } from "@/fzf/syntax/colorize"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import type { FzfCommandDefinitionDefaultOption, Resource, ResourceLines, SourceFuncArgs } from "@/type"

export const cocDefinitions = async (_args: SourceFuncArgs): Promise<Resource> => {
  const { definitions, symbol } = await getDefinition()
  const resourceLines: ResourceLines = definitions.map(({ file, lineNumber, text }) => ({
    data: {
      command: "FzfPreviewCocDefinition",
      type: "line",
      file,
      text,
      lineNumber,
    },
    displayText: `${colorizeFile(file)}:${colorize(lineNumber.toString(), "green")}:  ${text}`,
  }))

  return {
    type: "json",
    lines: resourceLines,
    options: { "--header": `"[Symbol] ${symbol}"` },
  }
}

const previewCommand = () => {
  const grepPreviewCommand = globalVariableSelector("fzfPreviewGrepPreviewCmd") as string

  return `"${grepPreviewCommand} {3..}"`
}

export const cocDefinitionsDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"Definitions> "',
  "--multi": true,
  "--preview": previewCommand(),
  "--preview-window": '"+{2}-10"',
  "--with-nth": '"3.."',
})

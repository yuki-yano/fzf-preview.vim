import { getTsServerSourceDefinition } from "@/connector/coc"
import { colorize, colorizeFile } from "@/fzf/syntax/colorize"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import type { FzfCommandDefinitionDefaultOption, Resource, ResourceLines, SourceFuncArgs } from "@/type"

export const cocTsServerSourceDefinition = async (_args: SourceFuncArgs): Promise<Resource> => {
  const { sourceDefinitions, symbol } = await getTsServerSourceDefinition()

  const resourceLines: ResourceLines = sourceDefinitions.map(({ file, lineNumber, text }) => ({
    data: {
      command: "FzfPreviewCocTsServerSourceDefinition",
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

export const cocTsServerSourceDefinitionsDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"SourceDefinitions> "',
  "--multi": true,
  "--preview": previewCommand(),
  "--preview-window": '"+{2}-10"',
  "--with-nth": '"3.."',
})

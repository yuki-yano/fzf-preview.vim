import { getTypeDefinition } from "@/connector/vim-lsp"
import { colorize, colorizeFile } from "@/fzf/syntax/colorize"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import type { FzfCommandDefinitionDefaultOption, Resource, ResourceLines, SourceFuncArgs } from "@/type"

export const vimLspTypeDefinition = async (_args: SourceFuncArgs): Promise<Resource> => {
  const { typeDefinitions } = await getTypeDefinition()
  const resourceLines: ResourceLines = typeDefinitions.map(({ file, lineNumber, text }) => ({
    data: {
      command: "FzfPreviewVimLspTypeDefinition",
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
  }
}

const previewCommand = () => {
  const grepPreviewCommand = globalVariableSelector("fzfPreviewGrepPreviewCmd") as string

  return `"${grepPreviewCommand} {3..}"`
}

export const vimLspTypeDefinitionDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"TypeDefinition> "',
  "--multi": true,
  "--preview": previewCommand(),
  "--preview-window": '"+{2}-10"',
  "--with-nth": '"3.."',
})

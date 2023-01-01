import { getDefinition } from "@/connector/nvim-lsp"
import { colorize, colorizeFile } from "@/fzf/syntax/colorize"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import type { FzfCommandDefinitionDefaultOption, Resource, ResourceLines, SourceFuncArgs } from "@/type"

export const nvimLspDefinition = async (_args: SourceFuncArgs): Promise<Resource> => {
  const { definition } = await getDefinition()
  const resourceLines: ResourceLines = definition.map(({ file, lineNumber, text }) => ({
    data: {
      command: "FzfPreviewNvimLspDefinition",
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

export const nvimLspDefinitionDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"Definition> "',
  "--multi": true,
  "--preview": previewCommand(),
  "--preview-window": '"+{2}-10"',
  "--with-nth": '"3.."',
})

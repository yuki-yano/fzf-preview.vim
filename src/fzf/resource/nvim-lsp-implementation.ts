import { getImplementation } from "@/connector/nvim-lsp"
import { colorize, colorizeFile } from "@/fzf/syntax/colorize"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import type { FzfCommandDefinitionDefaultOption, Resource, ResourceLines, SourceFuncArgs } from "@/type"

export const nvimLspImplementation = async (_args: SourceFuncArgs): Promise<Resource> => {
  const { implementations } = await getImplementation()
  const resourceLines: ResourceLines = implementations.map(({ file, lineNumber, text }) => ({
    data: {
      command: "FzfPreviewNvimLspImplementation",
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

export const nvimLspImplementationDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"Implementation> "',
  "--multi": true,
  "--preview": previewCommand(),
  "--preview-window": '"+{2}-10"',
  "--with-nth": '"3.."',
})

import { getReferences } from "@/connector/nvim-lsp"
import { colorize, colorizeFile } from "@/fzf/syntax/colorize"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import type { FzfCommandDefinitionDefaultOption, Resource, ResourceLines, SourceFuncArgs } from "@/type"

export const nvimLspReferences = async (_args: SourceFuncArgs): Promise<Resource> => {
  const { references } = await getReferences()
  const resourceLines: ResourceLines = references.map(({ file, lineNumber, text }) => ({
    data: {
      command: "FzfPreviewNvimLspReferences",
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

export const nvimLspReferencesDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"Implementation> "',
  "--multi": true,
  "--preview": previewCommand(),
  "--preview-window": '"+{2}-10"',
  "--with-nth": '"3.."',
})

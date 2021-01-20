import { getReferences } from "@/connector/coc"
import { colorize, colorizeFile } from "@/fzf/syntax/colorize"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import type { FzfCommandDefinitionDefaultOption, Resource, ResourceLines, SourceFuncArgs } from "@/type"

export const cocReferences = async (_args: SourceFuncArgs): Promise<Resource> => {
  const { references, symbol } = await getReferences()
  const resourceLines: ResourceLines = references.map(({ file, lineNumber, text }) => ({
    data: {
      command: "FzfPreviewCocReferences",
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

export const cocReferencesDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"References> "',
  "--multi": true,
  "--preview": previewCommand(),
  "--preview-window": '"+{2}-10"',
  "--with-nth": '"3.."',
})

import { getImplementations } from "@/connector/coc"
import { colorize, colorizeFile } from "@/fzf/syntax/colorize"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import type { FzfCommandDefinitionDefaultOption, Resource, ResourceLines, SourceFuncArgs } from "@/type"

export const cocImplementations = async (_args: SourceFuncArgs): Promise<Resource> => {
  const { implementations, symbol } = await getImplementations()
  const resourceLines: ResourceLines = implementations.map(({ file, lineNumber, text }) => ({
    data: {
      command: "FzfPreviewCocImplementations",
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

export const cocImplementationsDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"Implementations> "',
  "--multi": true,
  "--preview": previewCommand(),
  "--preview-window": '"+{2}-10"',
  "--with-nth": '"3.."',
  "--keep-right": true,
})

import { getDiagnostics } from "@/connector/nvim-lsp"
import { diagnosticToDisplayText } from "@/fzf/syntax/colorize"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import type {
  Diagnostic,
  FzfCommandDefinitionDefaultOption,
  Resource,
  ResourceLine,
  ResourceLines,
  SourceFuncArgs,
} from "@/type"

export const diagnosticToResourceLine = (diagnostic: Diagnostic): ResourceLine => {
  const { file, lineNumber, message } = diagnostic

  return {
    data: {
      command: "FzfPreviewNvimLspDiagnostics",
      type: "line",
      file,
      lineNumber,
      text: message,
    },
    displayText: diagnosticToDisplayText(diagnostic),
  }
}

export const nvimLspDiagnostics = async (_args: SourceFuncArgs): Promise<Resource> => {
  const { diagnostics } = await getDiagnostics()
  const resourceLines: ResourceLines = diagnostics.map((diagnostic) => diagnosticToResourceLine(diagnostic))

  return {
    type: "json",
    lines: resourceLines,
  }
}

const previewCommand = () => {
  const grepPreviewCommand = globalVariableSelector("fzfPreviewGrepPreviewCmd") as string

  return `"${grepPreviewCommand} {3..}"`
}

export const nvimLspDiagnosticsDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"Diagnostics> "',
  "--multi": true,
  "--preview": previewCommand(),
  "--preview-window": '"+{2}-10"',
  "--with-nth": '"3.."',
})

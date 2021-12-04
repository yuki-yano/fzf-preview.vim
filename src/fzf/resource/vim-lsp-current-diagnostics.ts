import { getCurrentDiagnostics } from "@/connector/vim-lsp"
import { diagnosticToResourceLine } from "@/fzf/resource/vim-lsp-diagnostics"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import type { FzfCommandDefinitionDefaultOption, Resource, ResourceLines, SourceFuncArgs } from "@/type"

export const vimLspCurrentDiagnostics = async (_args: SourceFuncArgs): Promise<Resource> => {
  const diagnostics = await getCurrentDiagnostics()
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

export const vimLspCurrentDiagnosticsDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"CurrentDiagnostics> "',
  "--multi": true,
  "--preview": previewCommand(),
  "--preview-window": '"+{2}-10"',
  "--with-nth": '"3.."',
})

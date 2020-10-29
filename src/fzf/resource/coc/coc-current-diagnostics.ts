import { getCurrentDiagnostics } from "@/connector/coc"
import { diagnosticToResourceLine } from "@/fzf/resource/coc/coc-diagnostics"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import type { FzfCommandDefinitionDefaultOption, Resource, ResourceLines, SourceFuncArgs } from "@/type"

export const cocCurrentDiagnostics = async (_args: SourceFuncArgs): Promise<Resource> => {
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

export const cocCurrentDiagnosticsDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"CurrentDiagnostics> "',
  "--multi": true,
  "--preview": previewCommand(),
  "--preview-window": '"+{2}-10"',
  "--with-nth": '"3.."',
})

import { getCurrentDiagnostics } from "@/connector/coc"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import type { FzfCommandDefinitionDefaultOption, Resource, SourceFuncArgs } from "@/type"

export const cocCurrentDiagnostics = async (_args: SourceFuncArgs): Promise<Resource> => {
  const diagnostics = await getCurrentDiagnostics()
  return { lines: diagnostics }
}

const previewCommand = () => {
  const grepPreviewCommand = globalVariableSelector("fzfPreviewGrepPreviewCmd") as string
  return `"${grepPreviewCommand} {}"`
}

export const cocCurrentDiagnosticsDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"CurrentDiagnostics> "',
  "--multi": true,
  "--preview": previewCommand(),
})

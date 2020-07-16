import { getDiagnostics } from "@/connector/coc"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import type { FzfCommandDefinitionDefaultOption, Resource, SourceFuncArgs } from "@/type"

export const cocDiagnostics = async (_args: SourceFuncArgs): Promise<Resource> => {
  const diagnostics = await getDiagnostics()
  return { lines: diagnostics }
}

const previewCommand = () => {
  const grepPreviewCommand = globalVariableSelector("fzfPreviewGrepPreviewCmd") as string
  return `"${grepPreviewCommand} {}"`
}

export const cocDiagnosticsDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"Diagnostics> "',
  "--multi": true,
  "--preview": previewCommand(),
})

import { getDiagnostics } from "@/connector/coc"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import type { FzfCommandDefinitionDefaultOption, Resource, ResourceLines, SourceFuncArgs } from "@/type"

export const cocDiagnostics = async (_args: SourceFuncArgs): Promise<Resource> => {
  const diagnostics = await getDiagnostics()
  const resourceLines: ResourceLines = diagnostics.map(({ file, lineNumber, text }) => ({
    data: {
      command: "FzfPreviewCocDiagnostics",
      type: "line",
      file,
      lineNumber,
      text,
    },
    displayText: text,
  }))

  return {
    type: "json",
    lines: resourceLines,
  }
}

const previewCommand = () => {
  const grepPreviewCommand = globalVariableSelector("fzfPreviewGrepPreviewCmd") as string
  return `"${grepPreviewCommand} {2..}"`
}

export const cocDiagnosticsDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"Diagnostics> "',
  "--multi": true,
  "--preview": previewCommand(),
})

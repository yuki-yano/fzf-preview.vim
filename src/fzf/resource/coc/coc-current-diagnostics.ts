import { getCurrentDiagnostics } from "@/connector/coc"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import type { FzfCommandDefinitionDefaultOption, Resource, ResourceLines, SourceFuncArgs } from "@/type"

export const cocCurrentDiagnostics = async (_args: SourceFuncArgs): Promise<Resource> => {
  const diagnostics = await getCurrentDiagnostics()
  const resourceLines: ResourceLines = diagnostics.map(({ file, lineNumber, text }) => ({
    data: {
      command: "FzfPreviewCocCurrentDiagnostics",
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

export const cocCurrentDiagnosticsDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"CurrentDiagnostics> "',
  "--multi": true,
  "--preview": previewCommand(),
})

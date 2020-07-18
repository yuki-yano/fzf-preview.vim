import { grepFormatBaseSyntax } from "@/fzf/resource/syntax"

export const cocReferencesSyntax: Array<string> = grepFormatBaseSyntax

export const cocDiagnosticsSyntax: Array<string> = [
  ...grepFormatBaseSyntax,
  String.raw`syntax match FzfPreviewDiagnosticsError /\sError\s/`,
  String.raw`syntax match FzfPreviewDiagnosticsWarning /\sWarning\s/`,
  String.raw`syntax match FzfPreviewDiagnosticsInformation /\sInformation\s/`,
  String.raw`syntax match FzfPreviewDiagnosticsHint /\sHint\s/`,
  "highlight default link FzfPreviewDiagnosticsError CocErrorSign",
  "highlight default link FzfPreviewDiagnosticsWarning CocWarningSign",
  "highlight default link FzfPreviewDiagnosticsInformation CocInfoSign",
  "highlight default link FzfPreviewDiagnosticsHint CocHintSign",
]

import { grepFormatBaseSyntax } from "@/fzf/syntax"

export const cocReferencesSyntax: Array<string> = grepFormatBaseSyntax

export const cocDiagnosticsSyntax: Array<string> = [
  ...grepFormatBaseSyntax,
  String.raw`syntax match FzfPreviewDiagnosticsError /\sError\s/ contained containedin=FzfPreviewGrepFileLine`,
  String.raw`syntax match FzfPreviewDiagnosticsWarning /\sWarning\s/ contained containedin=FzfPreviewGrepFileLine`,
  String.raw`syntax match FzfPreviewDiagnosticsInformation /\sInformation\s/ contained containedin=FzfPreviewGrepFileLine`,
  String.raw`syntax match FzfPreviewDiagnosticsHint /\sHint\s/ contained containedin=FzfPreviewGrepFileLine`,
  "highlight default link FzfPreviewDiagnosticsError CocErrorSign",
  "highlight default link FzfPreviewDiagnosticsWarning CocWarningSign",
  "highlight default link FzfPreviewDiagnosticsInformation CocInfoSign",
  "highlight default link FzfPreviewDiagnosticsHint CocHintSign",
]

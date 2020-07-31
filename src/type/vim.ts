export type VimBuffer = {
  fileName: string
  bufnr: number
  isCurrent: boolean
  isAlternate: boolean
  isModified: boolean
}

export type DiagnosticLevel = "Error" | "Warning" | "Information" | "Hint"

export type Diagnostic = {
  file: string
  lineNumber: number
  severity: DiagnosticLevel
  message: string
}

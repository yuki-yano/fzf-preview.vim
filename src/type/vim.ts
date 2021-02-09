import type { ReadonlyDeep } from "type-fest"

export type VimBuffer = ReadonlyDeep<{
  fileName: string
  bufnr: number
  isCurrent: boolean
  isAlternate: boolean
  isModified: boolean
}>

export type DiagnosticLevel = "Error" | "Warning" | "Information" | "Hint"

export type Diagnostic = ReadonlyDeep<{
  file: string
  lineNumber: number
  severity: DiagnosticLevel
  message: string
}>

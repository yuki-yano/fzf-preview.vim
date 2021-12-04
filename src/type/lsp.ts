import type { ReadonlyDeep } from "type-fest"

export type Location = ReadonlyDeep<{
  file: string
  lineNumber: number
  text: string
}>

export type DiagnosticLevel = "Error" | "Warning" | "Information" | "Hint"

export type Diagnostic = ReadonlyDeep<{
  file: string
  lineNumber: number
  severity: DiagnosticLevel
  message: string
}>

export type DiagnosticItem = ReadonlyDeep<{
  file: string
  lnum: number
  message: string
  severity: string
}>

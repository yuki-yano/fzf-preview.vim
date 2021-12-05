import type { OpenCommand } from "@/type/process"

export type OpenFile = {
  openCommand: OpenCommand
  file: string
  lineNumber?: number
  setTagStack?: boolean
}

export type ExportQuickFix =
  | {
      filename: string
    }
  | {
      filename: string
      lnum: number
      text: string
    }

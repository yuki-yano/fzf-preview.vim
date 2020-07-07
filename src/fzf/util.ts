import camelCase from "camelcase"

import { globalVariableSelector } from "@/module/selector/vim-variable"
import type { ProcessesName } from "@/type"

export const createProcessFunctionName = (processesName: ProcessesName, expectKey: string): string =>
  camelCase(`fzf-preview-${processesName}-${expectKey}`, { pascalCase: true })

export const filePreviewCommand = (): string => {
  const previewCommand = globalVariableSelector("fzfPreviewCommand") as string
  const binaryPreviewCommand = globalVariableSelector("fzfBinaryPreviewCommand") as string
  const ifBinaryCommand = globalVariableSelector("fzfPreviewIfBinaryCommand") as string

  return `'${ifBinaryCommand} && ${binaryPreviewCommand} || ${previewCommand}'`
}

type ParsedQuickFix = {
  fileName: string
  lineNumber: number
  text: string
}

export const parseQuickFixAndLocationListLine = (line: string): ParsedQuickFix => {
  const result = /^(?<fileName>[^|]*)\|((?<lineNumber>\d+)( col (\d+))?[^|]*)?\|(?<text>.*)/.exec(line)

  if (result == null || result.groups == null) {
    throw new Error(`line is not quickfix format: "${line}"`)
  }

  const { fileName, lineNumber, text } = result.groups
  return { fileName, lineNumber: Number(lineNumber), text }
}

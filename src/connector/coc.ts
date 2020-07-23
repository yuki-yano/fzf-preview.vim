import { DiagnosticItem } from "coc.nvim"

import { pluginCall } from "@/plugin"
import { currentFilePath, existsFileAsync } from "@/system/file"
import { filePathToProjectFilePath } from "@/system/project"

type Diagnostic = {
  file: string
  lineNumber: number
  text: string
}

const diagnosticItemToData = async (
  item: DiagnosticItem,
  option?: { currentFile: string }
): Promise<Diagnostic | null> => {
  if (!(await existsFileAsync(item.file))) {
    return null
  }

  const file = filePathToProjectFilePath(item.file)
  if (file == null || (option && option.currentFile !== file)) {
    return null
  }

  return {
    file,
    lineNumber: item.lnum,
    text: `${file}:${item.lnum}:  ${item.severity} ${item.message}`,
  }
}

export const getDiagnostics = async (): Promise<Array<Diagnostic>> => {
  const diagnosticItems = (await pluginCall("CocAction", ["diagnosticList"])) as Array<DiagnosticItem>
  const diagnostics = await Promise.all(diagnosticItems.map(async (item) => await diagnosticItemToData(item)))

  return diagnostics.filter((diagnostic): diagnostic is Diagnostic => diagnostic != null)
}

export const getCurrentDiagnostics = async (): Promise<Array<Diagnostic>> => {
  const currentFile = await currentFilePath()
  const diagnosticItems = (await pluginCall("CocAction", ["diagnosticList"])) as Array<DiagnosticItem>
  const diagnostics = await Promise.all(
    diagnosticItems.map(async (item) => await diagnosticItemToData(item, { currentFile }))
  )

  return diagnostics.filter((diagnostic): diagnostic is Diagnostic => diagnostic != null)
}

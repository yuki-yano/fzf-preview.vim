import { DiagnosticItem } from "coc.nvim"

import { pluginCall } from "@/plugin"
import { currentFilePath, existsFile } from "@/system/file"
import { filePathToProjectFilePath } from "@/system/project"

const diagnosticItemToLine = (item: DiagnosticItem, option?: { currentFile: string }): string | null => {
  if (!existsFile(item.file)) {
    return null
  }

  const file = filePathToProjectFilePath(item.file)
  if (file == null || (option && option.currentFile !== file)) {
    return null
  }

  return `${file}:${item.lnum}:  ${item.severity} ${item.message}`
}

export const getDiagnostics = async (): Promise<Array<string>> => {
  const diagnosticItems = (await pluginCall("CocAction", ["diagnosticList"])) as Array<DiagnosticItem>
  return diagnosticItems.map((item) => diagnosticItemToLine(item)).filter((line): line is string => line != null)
}

export const getCurrentDiagnostics = async (): Promise<Array<string>> => {
  const currentFile = await currentFilePath()
  const diagnosticItems = (await pluginCall("CocAction", ["diagnosticList"])) as Array<DiagnosticItem>
  return diagnosticItems
    .map((item) => diagnosticItemToLine(item, { currentFile }))
    .filter((line): line is string => line != null)
}

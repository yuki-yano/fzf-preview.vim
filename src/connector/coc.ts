import { DiagnosticItem } from "coc.nvim"

import { pluginCall } from "@/plugin"
import { currentFilePath, existsFile } from "@/system/file"
import { filePathToProjectFilePath } from "@/system/project"

const diagnosticItemToLine = async (item: DiagnosticItem, option?: { currentFile: string }): Promise<string> => {
  if (!(await existsFile(item.file))) {
    return ""
  }

  const file = filePathToProjectFilePath(item.file)
  if (file == null || (option && option.currentFile !== file)) {
    return ""
  }

  return `${file}:${item.lnum}:  ${item.severity} ${item.message}`
}

export const getDiagnostics = async (): Promise<Array<string>> => {
  const diagnosticItems = (await pluginCall("CocAction", ["diagnosticList"])) as Array<DiagnosticItem>
  const lines = await Promise.all(diagnosticItems.map(async (item) => await diagnosticItemToLine(item)))

  return lines.filter((line) => line !== "")
}

export const getCurrentDiagnostics = async (): Promise<Array<string>> => {
  const currentFile = await currentFilePath()
  const diagnosticItems = (await pluginCall("CocAction", ["diagnosticList"])) as Array<DiagnosticItem>
  const lines = await Promise.all(
    diagnosticItems.map(async (item) => await diagnosticItemToLine(item, { currentFile }))
  )

  return lines.filter((line) => line !== "")
}

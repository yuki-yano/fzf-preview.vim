import { DiagnosticItem } from "coc.nvim"

import { pluginCall } from "@/plugin"
import { existsFileAsync, getCurrentFilePath, getCurrentPath } from "@/system/file"
import { filePathToRelativeFilePath } from "@/system/project"
import type { Diagnostic, DiagnosticLevel } from "@/type"

const diagnosticItemToData = async (
  item: DiagnosticItem,
  option?: { currentFile: string }
): Promise<Diagnostic | null> => {
  if (!(await existsFileAsync(item.file))) {
    return null
  }

  const currentPath = await getCurrentPath()
  const file = filePathToRelativeFilePath(item.file, currentPath)
  if (file == null || option?.currentFile !== file) {
    return null
  }

  return {
    file,
    lineNumber: item.lnum,
    severity: item.severity as DiagnosticLevel,
    message: item.message,
  }
}

export const getDiagnostics = async (): Promise<Array<Diagnostic>> => {
  const diagnosticItems = (await pluginCall("CocAction", ["diagnosticList"])) as Array<DiagnosticItem>
  const diagnostics = await Promise.all(diagnosticItems.map(async (item) => await diagnosticItemToData(item)))

  return diagnostics.filter((diagnostic): diagnostic is Diagnostic => diagnostic != null)
}

export const getCurrentDiagnostics = async (): Promise<Array<Diagnostic>> => {
  const currentFile = await getCurrentFilePath()
  const diagnosticItems = (await pluginCall("CocAction", ["diagnosticList"])) as Array<DiagnosticItem>
  const diagnostics = await Promise.all(
    diagnosticItems.map(async (item) => await diagnosticItemToData(item, { currentFile }))
  )

  return diagnostics.filter((diagnostic): diagnostic is Diagnostic => diagnostic != null)
}

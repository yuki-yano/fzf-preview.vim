import type { DiagnosticItem } from "coc.nvim"
import { languages, workspace } from "coc.nvim"
import type { Location as CocLocation } from "vscode-languageserver-types"

import { getLineFromFile } from "@/connector/util"
import { pluginCall } from "@/plugin"
import { existsFileAsync, getCurrentFilePath, getCurrentPath } from "@/system/file"
import { dropFileProtocol, filePathToRelativeFilePath } from "@/system/project"
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

type Location = {
  file: string
  lineNumber: number
  text: string
}

const getCurrentState = async () => {
  const { document, position } = await workspace.getCurrentState()

  const ranges = await languages.getSelectionRanges(document, [position])
  const symbol = ranges && ranges[0] ? document.getText(ranges[0].range) : ""

  return { document, position, symbol }
}

const cocLocationToLocation = async (locations: Array<CocLocation>): Promise<Array<Location>> => {
  const currentPath = await getCurrentPath()

  return (
    await Promise.all(
      locations.map(async (location) => {
        const lineNumber = location.range.start.line + 1
        const absoluteFilePath = dropFileProtocol(location.uri)
        const relativeFilePath = filePathToRelativeFilePath(absoluteFilePath, currentPath)
        if (relativeFilePath == null) {
          return null
        }
        const text = await getLineFromFile(absoluteFilePath, lineNumber)

        return { file: relativeFilePath, lineNumber, text }
      })
    )
  ).filter((location): location is Location => location != null)
}

export const getReferences = async (): Promise<{ references: Array<Location>; symbol: string }> => {
  const { document, position, symbol } = await getCurrentState()
  const locations = await languages.getReferences(document, { includeDeclaration: false }, position)

  return {
    references: await cocLocationToLocation(locations),
    symbol,
  }
}

export const getTypeDefinition = async (): Promise<{ typeDefinitions: Array<Location>; symbol: string }> => {
  const { document, position, symbol } = await getCurrentState()
  const locations = await languages.getTypeDefinition(document, position)

  return {
    typeDefinitions: await cocLocationToLocation(locations),
    symbol,
  }
}

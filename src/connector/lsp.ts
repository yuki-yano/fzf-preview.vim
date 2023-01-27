import type { ReadonlyDeep } from "type-fest"
import type { Location as LspLocation, LocationLink } from "vscode-languageserver-types"

import { getLineFromFile } from "@/connector/util"
import { collapseHome, existsFileAsync, getCurrentPath } from "@/system/file"
import { dropFileProtocol, filePathToRelativeFilePath } from "@/system/project"
import type { Diagnostic, DiagnosticItem, DiagnosticLevel, Location } from "@/type"

export const diagnosticItemToData = async (
  item: ReadonlyDeep<DiagnosticItem>,
  option?: { currentFile: string }
): Promise<ReadonlyDeep<Diagnostic | null>> => {
  if (!(await existsFileAsync(item.file))) {
    return null
  }

  const currentPath = await getCurrentPath()
  const file = filePathToRelativeFilePath(item.file, currentPath)

  if (file == null) {
    return null
  }
  if (option?.currentFile != null && option.currentFile !== file) {
    return null
  }

  return {
    file,
    lineNumber: item.lnum,
    severity: item.severity as DiagnosticLevel,
    message: item.message,
  } as const
}

type LocationOrLocationLink =
  | (LspLocation & {
      kind?: undefined
    })
  | (LspLocation & {
      kind: "location"
    })
  | (LocationLink & {
      kind: "locationLink"
    })

export const lspLocationToLocation = async (
  locations: ReadonlyArray<LocationOrLocationLink>
): Promise<ReadonlyArray<Location>> => {
  const currentPath = await getCurrentPath()

  return (
    await Promise.all(
      locations.map(async (location) => {
        let lineNumber: number
        let uri: string
        if (location.kind == null || location.kind === "location") {
          lineNumber = location.range.start.line + 1
          uri = location.uri
        } else if (location.targetRange != null) {
          lineNumber = location.targetRange.start.line + 1
          uri = location.targetUri
        } else {
          throw new Error("Unexpected location")
        }

        const absoluteFilePath = decodeURIComponent(dropFileProtocol(uri))
        const filePath =
          new RegExp(`^${currentPath}`).exec(absoluteFilePath) != null
            ? filePathToRelativeFilePath(absoluteFilePath, currentPath)
            : collapseHome(absoluteFilePath)

        if (filePath == null) {
          return null
        }
        const text = await getLineFromFile(absoluteFilePath, lineNumber)

        return { file: filePath, lineNumber, text }
      })
    )
  ).filter((location): location is Location => location != null)
}

import { isEqual } from "lodash"
import type { Diagnostic as LspDiagnostic, Location as VimLspLocation } from "vscode-languageserver-types"

import { diagnosticItemToData, lspLocationToLocation } from "@/connector/lsp"
import { pluginCall } from "@/plugin"
import { getCurrentFilePath } from "@/system/file"
import { dropFileProtocol } from "@/system/project"
import type { Diagnostic, DiagnosticItem, Location } from "@/type"

type VimLspDiagnostic = {
  [file: string]: {
    [server: string]: {
      params: {
        diagnostics: ReadonlyArray<LspDiagnostic>
      }
    }
  }
}

const severity = ["", "Error", "Warning", "Information", "Hint"]

const getDiagnosticsItems = async () => {
  const lspDiagnostic = (await pluginCall(
    "lsp#internal#diagnostics#state#_get_all_diagnostics_grouped_by_uri_and_server"
  )) as VimLspDiagnostic

  const diagnosticItems: ReadonlyArray<DiagnosticItem | null> = Object.entries(lspDiagnostic).flatMap(
    ([path, result]) => {
      const diagnostics = Object.entries(result).flatMap(([_, v]) => v.params.diagnostics)

      const file = decodeURIComponent(dropFileProtocol(path))
      if (file == null) {
        return null
      }

      return diagnostics.map<DiagnosticItem>((diagnostic) => ({
        file,
        lnum: diagnostic.range.start.line,
        message: diagnostic.message,
        severity: severity[diagnostic?.severity as number] ?? "",
      }))
    }
  )

  return diagnosticItems
}

export const getDiagnostics = async (): Promise<ReadonlyArray<Diagnostic>> => {
  const diagnosticItems = await getDiagnosticsItems()

  const diagnostics = await Promise.all(
    diagnosticItems.filter((v): v is DiagnosticItem => v != null).map(async (item) => await diagnosticItemToData(item))
  )

  return diagnostics.filter((diagnostic): diagnostic is Diagnostic => diagnostic != null)
}

export const getCurrentDiagnostics = async (): Promise<ReadonlyArray<Diagnostic>> => {
  const currentFile = await getCurrentFilePath()
  const diagnosticItems = await getDiagnosticsItems()

  const diagnostics = await Promise.all(
    diagnosticItems
      .filter((v): v is DiagnosticItem => v != null)
      .map(async (item) => await diagnosticItemToData(item, { currentFile }))
  )

  return diagnostics.filter((diagnostic): diagnostic is Diagnostic => diagnostic != null)
}

export const getReferences = async (): Promise<{
  references: ReadonlyArray<Location>
}> => {
  const servers = (await pluginCall("fzf_preview#remote#resource#vim_lsp#servers", [
    "references",
  ])) as ReadonlyArray<string>
  await pluginCall("fzf_preview#remote#resource#vim_lsp#request_references", [servers])

  let referencesWithServer: {
    [server: string]: ReadonlyArray<VimLspLocation>
  } = {}

  for (let i = 0; i < 100; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    referencesWithServer = (await pluginCall("fzf_preview#remote#resource#vim_lsp#fetch_references")) as {
      [server: string]: ReadonlyArray<VimLspLocation>
    }

    if (isEqual([...servers].sort(), Object.keys(referencesWithServer).sort())) {
      break
    }

    // eslint-disable-next-line no-await-in-loop
    await new Promise((resolve) => setTimeout(resolve, 50))
  }

  return {
    references: await lspLocationToLocation(
      Object.entries(referencesWithServer).flatMap(([_, references]) => references)
    ),
  }
}

export const getDefinition = async (): Promise<{
  definitions: ReadonlyArray<Location>
}> => {
  const servers = (await pluginCall("fzf_preview#remote#resource#vim_lsp#servers", [
    "definition",
  ])) as ReadonlyArray<string>
  await pluginCall("fzf_preview#remote#resource#vim_lsp#request_definition", [servers])

  let definitionWithServer: {
    [server: string]: ReadonlyArray<VimLspLocation>
  } = {}

  for (let i = 0; i < 100; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    definitionWithServer = (await pluginCall("fzf_preview#remote#resource#vim_lsp#fetch_definition")) as {
      [server: string]: ReadonlyArray<VimLspLocation>
    }
    console.warn(definitionWithServer)
    console.warn(servers)

    if (isEqual([...servers].sort(), Object.keys(definitionWithServer).sort())) {
      break
    }

    // eslint-disable-next-line no-await-in-loop
    await new Promise((resolve) => setTimeout(resolve, 50))
  }

  return {
    definitions: await lspLocationToLocation(
      Object.entries(definitionWithServer).flatMap(([_, definition]) => definition)
    ),
  }
}

export const getTypeDefinition = async (): Promise<{
  typeDefinitions: ReadonlyArray<Location>
}> => {
  const servers = (await pluginCall("fzf_preview#remote#resource#vim_lsp#servers", [
    "type_definition",
  ])) as ReadonlyArray<string>
  await pluginCall("fzf_preview#remote#resource#vim_lsp#request_type_definition", [servers])

  let typeDefinitionWithServer: {
    [server: string]: ReadonlyArray<VimLspLocation>
  } = {}

  for (let i = 0; i < 100; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    typeDefinitionWithServer = (await pluginCall("fzf_preview#remote#resource#vim_lsp#fetch_type_definition")) as {
      [server: string]: ReadonlyArray<VimLspLocation>
    }

    if (isEqual([...servers].sort(), Object.keys(typeDefinitionWithServer).sort())) {
      break
    }

    // eslint-disable-next-line no-await-in-loop
    await new Promise((resolve) => setTimeout(resolve, 50))
  }

  return {
    typeDefinitions: await lspLocationToLocation(
      Object.entries(typeDefinitionWithServer).flatMap(([_, typeDefinition]) => typeDefinition)
    ),
  }
}

export const getImplementation = async (): Promise<{
  implementations: ReadonlyArray<Location>
}> => {
  const servers = (await pluginCall("fzf_preview#remote#resource#vim_lsp#servers", [
    "implementation",
  ])) as ReadonlyArray<string>
  await pluginCall("fzf_preview#remote#resource#vim_lsp#request_implementation", [servers])

  let implementationWithServer: {
    [server: string]: ReadonlyArray<VimLspLocation>
  } = {}

  for (let i = 0; i < 100; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    implementationWithServer = (await pluginCall("fzf_preview#remote#resource#vim_lsp#fetch_implementation")) as {
      [server: string]: ReadonlyArray<VimLspLocation>
    }

    if (isEqual([...servers].sort(), Object.keys(implementationWithServer).sort())) {
      break
    }

    // eslint-disable-next-line no-await-in-loop
    await new Promise((resolve) => setTimeout(resolve, 50))
  }

  return {
    implementations: await lspLocationToLocation(
      Object.entries(implementationWithServer).flatMap(([_, implementation]) => implementation)
    ),
  }
}

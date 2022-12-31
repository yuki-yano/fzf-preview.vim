import type {
  CancellationToken,
  DefinitionProvider,
  DiagnosticItem,
  ImplementationProvider,
  Position,
  Range,
  ReferenceProvider,
  TypeDefinitionProvider,
} from "coc.nvim"
import { CancellationTokenSource, languages, services, workspace } from "coc.nvim"
import type {
  DefinitionLink as CocDefinitionLink,
  Location as CocLocation,
  LocationLink as CocLocationLink,
} from "vscode-languageserver-types"

import { diagnosticItemToData, lspLocationToLocation } from "@/connector/lsp"
import { pluginCall } from "@/plugin"
import { getCurrentFilePath, getCurrentPath, readFileLine } from "@/system/file"
import { dropFileProtocol, filePathToRelativeFilePath } from "@/system/project"
import type { Diagnostic, Location } from "@/type"
import { uniqWith } from "@/util/uniq-with"

type ReferenceProviders = ReadonlyArray<{
  provider: ReferenceProvider
}>

type DefinitionProviders = ReadonlyArray<{
  provider: DefinitionProvider
}>

type TypeDefinitionProviders = ReadonlyArray<{
  provider: TypeDefinitionProvider
}>

type ImplementationProviders = ReadonlyArray<{
  provider: ImplementationProvider
}>

export const getDiagnostics = async (): Promise<ReadonlyArray<Diagnostic>> => {
  const diagnosticItems = (await pluginCall("CocAction", ["diagnosticList"])) as ReadonlyArray<DiagnosticItem>
  const diagnostics = await Promise.all(diagnosticItems.map(async (item) => await diagnosticItemToData(item)))

  return diagnostics.filter((diagnostic): diagnostic is Diagnostic => diagnostic != null)
}

export const getCurrentDiagnostics = async (): Promise<ReadonlyArray<Diagnostic>> => {
  const currentFile = await getCurrentFilePath()
  const diagnosticItems = (await pluginCall("CocAction", ["diagnosticList"])) as ReadonlyArray<DiagnosticItem>
  const diagnostics = await Promise.all(
    diagnosticItems.map(async (item) => await diagnosticItemToData(item, { currentFile }))
  )

  return diagnostics.filter((diagnostic): diagnostic is Diagnostic => diagnostic != null)
}

const getCurrentState = async () => {
  const { document, position } = await workspace.getCurrentState()
  const range = (await workspace.document).getWordRangeAtPosition(position)
  const symbol = range && range != null ? document.getText(range) : ""

  return { document, position, symbol } as const
}

export const getReferences = async (): Promise<{
  references: ReadonlyArray<Location>
  symbol: string
}> => {
  let locations: ReadonlyArray<CocLocation> = []

  const { document, position, symbol } = await getCurrentState()
  const tokenSource = new CancellationTokenSource()

  // @ts-expect-error
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
  const providers: ReferenceProviders = Array.from(languages.referenceManager.providers)
  for (const { provider } of providers) {
    // eslint-disable-next-line no-await-in-loop
    const references = await provider.provideReferences(
      document,
      position,
      { includeDeclaration: false },
      tokenSource.token
    )
    if (references != null) {
      locations = [...locations, ...references]
    }
  }

  const references = uniqWith(
    (await lspLocationToLocation(locations.map((v) => ({ ...v, kind: "location" })))) as Array<Location>,
    (a, b) => a.file === b.file && a.lineNumber === b.lineNumber && a.text === b.text
  )

  return {
    references,
    symbol,
  } as const
}

export const getDefinition = async (): Promise<{ definitions: ReadonlyArray<Location>; symbol: string }> => {
  let locations: ReadonlyArray<CocLocation> = []

  const { document, position, symbol } = await getCurrentState()
  const tokenSource = new CancellationTokenSource()

  // @ts-expect-error
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
  const providers: DefinitionProviders = Array.from(languages.definitionManager.providers)
  for (const { provider } of providers) {
    /* eslint-disable no-await-in-loop */
    const definitions = (
      (await provider.provideDefinition(document, position, tokenSource.token)) as unknown as
        | ReadonlyArray<CocDefinitionLink>
        | undefined
    )?.map<CocLocation>((definitionLink) => ({
      range: definitionLink.targetRange,
      uri: definitionLink.targetUri,
    }))
    /* eslint-enable */

    if (definitions != null) {
      locations = [...locations, ...definitions]
    }
  }

  const definitions = uniqWith(
    (await lspLocationToLocation(locations.map((v) => ({ ...v, kind: "location" })))) as Array<Location>,
    (a, b) => a.file === b.file && a.lineNumber === b.lineNumber && a.text === b.text
  )

  return {
    definitions,
    symbol,
  } as const
}

export const getTypeDefinition = async (): Promise<{ typeDefinitions: ReadonlyArray<Location>; symbol: string }> => {
  let locations: ReadonlyArray<CocLocationLink> = []

  const { document, position, symbol } = await getCurrentState()
  const tokenSource = new CancellationTokenSource()

  // @ts-expect-error
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
  const providers: TypeDefinitionProviders = Array.from(languages.typeDefinitionManager.providers)
  for (const { provider } of providers) {
    // eslint-disable-next-line no-await-in-loop
    const typeDefinitions = (await provider.provideTypeDefinition(
      document,
      position,
      tokenSource.token
    )) as unknown as ReadonlyArray<CocLocationLink>
    if (typeDefinitions != null) {
      locations = [...locations, ...typeDefinitions]
    }
  }

  const typeDefinitions = uniqWith(
    (await lspLocationToLocation(locations.map((v) => ({ ...v, kind: "locationLink" })))) as Array<Location>,
    (a, b) => a.file === b.file && a.lineNumber === b.lineNumber && a.text === b.text
  )

  return {
    typeDefinitions,
    symbol,
  } as const
}

export const getImplementation = async (): Promise<{
  implementations: ReadonlyArray<Location>
  symbol: string
}> => {
  let locations: ReadonlyArray<CocLocationLink> = []

  const { document, position, symbol } = await getCurrentState()
  const tokenSource = new CancellationTokenSource()

  // @ts-expect-error
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
  const providers: ImplementationProviders = Array.from(languages.implementationManager.providers)
  for (const { provider } of providers) {
    // eslint-disable-next-line no-await-in-loop
    const implementations = (await provider.provideImplementation(
      document,
      position,
      tokenSource.token
    )) as unknown as ReadonlyArray<CocLocationLink>
    if (implementations != null) {
      locations = [...locations, ...implementations]
    }
  }

  const implementations = uniqWith(
    (await lspLocationToLocation(locations.map((v) => ({ ...v, kind: "locationLink" })))) as Array<Location>,
    (a, b) => a.file === b.file && a.lineNumber === b.lineNumber && a.text === b.text
  )

  return {
    implementations,
    symbol,
  } as const
}

type CocOutlineItem = {
  data?: {
    kind: string
  }
  filterText: string
  label: string
  location: {
    range: Range
    uri: string
  }
}

type OutlineItem = {
  kind: string | undefined
  text: string
  label: string
  lineNumber: number
  file: string
}

const outlineItemToData = async ({
  data,
  filterText,
  label,
  location: {
    uri,
    range: {
      start: { line },
    },
  },
}: CocOutlineItem): Promise<OutlineItem | null> => {
  const currentPath = await getCurrentPath()
  const file = filePathToRelativeFilePath(decodeURIComponent(dropFileProtocol(uri)), currentPath)

  if (file == null) {
    return null
  }

  return {
    kind: data?.kind,
    file,
    text: filterText,
    label,
    lineNumber: line + 1,
  }
}

export const getOutline = async (): Promise<ReadonlyArray<OutlineItem>> => {
  const cocOutlineItems = (await pluginCall("CocAction", ["listLoadItems", "outline"])) as ReadonlyArray<CocOutlineItem>
  const data = Promise.all(
    cocOutlineItems
      .map(async (cocItem) => await outlineItemToData(cocItem))
      .filter(async (item) => (await item) != null)
  ) as Promise<ReadonlyArray<OutlineItem>>

  return data
}

type TsServerSourceDefinitionServiceClient = {
  toOpenedFilePath: (uri: string) => string
  execute: (
    command: "findSourceDefinition",
    args: { file: string; line: number; offset: number },
    token: CancellationToken
  ) => Promise<{
    type: "response"
    success: true
    body: Array<{
      file: string
      start: Position
      end: Position
    }>
  }>
}

export const getTsServerSourceDefinition = async (): Promise<{
  sourceDefinitions: ReadonlyArray<Location>
  symbol: string
}> => {
  const { document, position, symbol } = await getCurrentState()
  const currentPath = await getCurrentPath()

  // @ts-expect-error
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const serviceClient = services.getService("tsserver")?.clientHost
    ?.serviceClient as TsServerSourceDefinitionServiceClient

  if (serviceClient == null) {
    return { sourceDefinitions: [], symbol }
  }

  const file = serviceClient.toOpenedFilePath(document.uri)
  const tokenSource = new CancellationTokenSource()

  const args = {
    file,
    line: position.line + 1,
    offset: position.character + 1,
  }

  const response = await serviceClient.execute("findSourceDefinition", args, tokenSource.token)

  return {
    symbol,
    sourceDefinitions: response.body.map((v) => {
      const relativeFilePath = filePathToRelativeFilePath(v.file, currentPath)

      if (relativeFilePath == null) {
        console.error(v)
        throw new Error("Source definition response error.")
      }

      return {
        file: relativeFilePath,
        lineNumber: v.start.line,
        text: readFileLine(v.file, v.start.line),
      }
    }),
  }
}

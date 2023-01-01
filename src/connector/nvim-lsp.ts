import type { LocationLink } from "coc.nvim"
import type { Location as LspLocation } from "vscode-languageserver-types"

import { lspLocationToLocation } from "@/connector/lsp"
import { pluginCall, pluginCommand, pluginGetVar } from "@/plugin"
import type { Diagnostic, Location } from "@/type"

export const getReferences = async (): Promise<{ references: ReadonlyArray<Location> }> => {
  await pluginCommand(`lua require("fzf-preview").nvim_lsp_references()`)
  const references = (await pluginGetVar("fzf_preview_nvim_lsp_references")) as ReadonlyArray<LspLocation>

  return {
    references: await lspLocationToLocation(references),
  }
}

type NvimLspDiagnostic = {
  bufnr: number
  lnum: number
  message: string
  severity: number
}

const severity = ["", "Error", "Warning", "Information", "Hint"] as const

const nvimLspDiagnosticToDiagnosticItem = async (nvimDiagnostic: NvimLspDiagnostic): Promise<Diagnostic> => {
  const file = (await pluginCall("bufname", [nvimDiagnostic.bufnr])) as string

  return {
    file,
    lineNumber: nvimDiagnostic.lnum,
    message: nvimDiagnostic.message,
    severity: severity[nvimDiagnostic.severity],
  }
}

export const getDiagnostics = async (): Promise<{ diagnostics: ReadonlyArray<Diagnostic> }> => {
  await pluginCommand(`lua require("fzf-preview").nvim_lsp_diagnostics()`)
  const diagnostics = (await pluginGetVar("fzf_preview_nvim_lsp_diagnostics")) as ReadonlyArray<NvimLspDiagnostic>

  return {
    diagnostics: await Promise.all(diagnostics.map(nvimLspDiagnosticToDiagnosticItem)),
  }
}

export const getCurrentDiagnostics = async (): Promise<{ diagnostics: ReadonlyArray<Diagnostic> }> => {
  await pluginCommand(`lua require("fzf-preview").nvim_lsp_current_diagnostics()`)
  const diagnostics = (await pluginGetVar(
    "fzf_preview_nvim_lsp_current_diagnostics"
  )) as ReadonlyArray<NvimLspDiagnostic>

  return {
    diagnostics: await Promise.all(diagnostics.map(nvimLspDiagnosticToDiagnosticItem)),
  }
}

export const getDefinition = async (): Promise<{ definition: ReadonlyArray<Location> }> => {
  await pluginCommand(`lua require("fzf-preview").nvim_lsp_definition()`)
  const definition = (await pluginGetVar("fzf_preview_nvim_lsp_definition")) as ReadonlyArray<LocationLink>

  return {
    definition: await lspLocationToLocation(definition.map((v) => ({ ...v, kind: "locationLink" }))),
  }
}

export const getTypeDefinition = async (): Promise<{ typeDefinition: ReadonlyArray<Location> }> => {
  await pluginCommand(`lua require("fzf-preview").nvim_lsp_type_definition()`)
  const typeDefinition = (await pluginGetVar("fzf_preview_nvim_lsp_type_definition")) as ReadonlyArray<LspLocation>

  return {
    typeDefinition: await lspLocationToLocation(typeDefinition),
  }
}

export const getImplementation = async (): Promise<{ implementations: ReadonlyArray<Location> }> => {
  await pluginCommand(`lua require("fzf-preview").nvim_lsp_implementations()`)
  const implementations = (await pluginGetVar("fzf_preview_nvim_lsp_implementations")) as ReadonlyArray<LspLocation>

  return {
    implementations: await lspLocationToLocation(implementations),
  }
}

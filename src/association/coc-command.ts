import { parseEmptySourceFuncArgs } from "@/args"
import { commandDefinition, vimCommandOptions } from "@/association/command"
import {
  cocCurrentDiagnostics,
  cocCurrentDiagnosticsDefaultOptions,
  cocDiagnostics,
  cocDiagnosticsDefaultOptions,
  cocReferences,
  cocReferencesDefaultOptions,
} from "@/fzf/resource/coc"
import { cocDiagnosticsSyntax, cocReferencesSyntax } from "@/fzf/syntax/coc"
import type { FzfCommand } from "@/type"

export const cocCommandDefinition: Array<FzfCommand> = [
  ...commandDefinition,
  {
    commandName: "FzfPreviewCocReferences",
    sourceFunc: cocReferences,
    sourceFuncArgsParser: parseEmptySourceFuncArgs,
    vimCommandOptions,
    defaultFzfOptionFunc: cocReferencesDefaultOptions,
    defaultProcessesName: "open-file",
    enableConvertForFzf: true,
    enableDevIcons: true,
    enablePostProcessCommand: false,
    syntaxCommands: cocReferencesSyntax,
  },
  {
    commandName: "FzfPreviewCocDiagnostics",
    sourceFunc: cocDiagnostics,
    sourceFuncArgsParser: parseEmptySourceFuncArgs,
    vimCommandOptions,
    defaultFzfOptionFunc: cocDiagnosticsDefaultOptions,
    defaultProcessesName: "open-file",
    enableConvertForFzf: true,
    enableDevIcons: true,
    enablePostProcessCommand: false,
    syntaxCommands: cocDiagnosticsSyntax,
  },
  {
    commandName: "FzfPreviewCocCurrentDiagnostics",
    sourceFunc: cocCurrentDiagnostics,
    sourceFuncArgsParser: parseEmptySourceFuncArgs,
    vimCommandOptions,
    defaultFzfOptionFunc: cocCurrentDiagnosticsDefaultOptions,
    defaultProcessesName: "open-file",
    enableConvertForFzf: true,
    enableDevIcons: true,
    enablePostProcessCommand: false,
    syntaxCommands: cocDiagnosticsSyntax,
  },
]

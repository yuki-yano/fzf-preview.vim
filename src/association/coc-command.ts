import { parseEmptySourceFuncArgs } from "@/args"
import { commandDefinition, vimCommandOptions } from "@/association/command"
import {
  cocCurrentDiagnostics,
  cocCurrentDiagnosticsDefaultOptions,
  cocDiagnostics,
  cocDiagnosticsDefaultOptions,
  cocImplementations,
  cocImplementationsDefaultOptions,
  cocReferences,
  cocReferencesDefaultOptions,
  cocTypeDefinitions,
  cocTypeDefinitionsDefaultOptions,
} from "@/fzf/resource/coc"
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
  },
  {
    commandName: "FzfPreviewCocTypeDefinitions",
    sourceFunc: cocTypeDefinitions,
    sourceFuncArgsParser: parseEmptySourceFuncArgs,
    vimCommandOptions,
    defaultFzfOptionFunc: cocTypeDefinitionsDefaultOptions,
    defaultProcessesName: "open-file",
    enableConvertForFzf: true,
    enableDevIcons: true,
  },
  {
    commandName: "FzfPreviewCocImplementations",
    sourceFunc: cocImplementations,
    sourceFuncArgsParser: parseEmptySourceFuncArgs,
    vimCommandOptions,
    defaultFzfOptionFunc: cocImplementationsDefaultOptions,
    defaultProcessesName: "open-file",
    enableConvertForFzf: true,
    enableDevIcons: true,
  },
]

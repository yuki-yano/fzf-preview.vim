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
import { colorizeDiagnostic, colorizeGrep } from "@/fzf/syntax/colorize"
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
    colorizeFunc: colorizeGrep,
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
    colorizeFunc: colorizeDiagnostic,
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
    colorizeFunc: colorizeDiagnostic,
  },
]

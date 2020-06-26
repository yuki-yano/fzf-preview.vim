import { CommandOptions } from "neovim/lib/host/NvimPlugin"

import type { Processes } from "@/type"

export type ResourceLine = string
export type ResourceLines = Array<ResourceLine>

export type SelectedLine = string
export type SelectedLines = Array<SelectedLine>

export type ExpectKeyAndSelectedLines = Array<string>

export type FzfCommandName =
  | "TSFzfPreviewProjectFiles"
  | "TSFzfPreviewGitFiles"
  | "TSFzfPreviewDirectoryFiles"
  | "TSFzfPreviewGitStatus"
  | "TSFzfPreviewBuffers"
  | "TSFzfPreviewAllBuffers"
  | "TSFzfPreviewProjectOldFiles"
  | "TSFzfPreviewProjectMruFiles"
  | "TSFzfPreviewProjectMrwFiles"
  | "TSFzfPreviewLines"
  | "TSFzfPreviewBufferLines"
  | "TSFzfPreviewCtags"
  | "TSFzfPreviewBufferTags"
  | "TSFzfPreviewOldFiles"
  | "TSFzfPreviewMruFiles"
  | "TSFzfPreviewMrwFiles"
  | "TSFzfPreviewQuickFix"
  | "TSFzfPreviewLocationList"
  | "TSFzfPreviewJumps"
  | "TSFzfPreviewChanges"
  | "TSFzfPreviewMarks"
  | "TSFzfPreviewProjectGrep"
  | "TSFzfPreviewProjectCommandGrep"

export type SourceFuncArgs = {
  args: Array<string>
  extraArgs: Array<string>
}

export type FzfCommand = {
  commandName: FzfCommandName
  sourceFunc: (sourceFuncArgs: SourceFuncArgs) => Promise<ResourceLines>
  convertLine: (line: SelectedLine) => SelectedLine
  sourceFuncArgsParser?: (args: string) => SourceFuncArgs
  vimCommandOptions: CommandOptions
  defaultFzfOptionFunc: () =>
    | { [optionName: string]: string | boolean | undefined }
    | Promise<{ [optionName: string]: string | boolean | undefined }>
  defaultProcesses: Processes
  enableDevIcons: boolean
  beforeCommandHook?: (args: string) => void
}

export type FzfOptions = {
  "--ansi"?: boolean
  "--bind"?:
    | ReadonlyArray<{
        key: string
        action: string
      }>
    | string
  "--expect"?: ReadonlyArray<string> | string
  [otherProperty: string]: any // eslint-disable-line @typescript-eslint/no-explicit-any
}

export type FzfCommandDefinitionDefaultOption = {
  "--prompt": string
  "--multi": boolean
  "--preview": string
  "--no-sort"?: boolean
  "--delimiter"?: string
  "--phony"?: boolean
  "--bind"?: string
  "--query"?: string
}

export type AddFzfArgs = {
  optionName: string
  value?: string
}

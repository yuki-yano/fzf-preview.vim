import { CommandOptions } from "neovim/lib/host/NvimPlugin"

import { ProcessesName } from "@/type/process"

export type ResourceLine = string
export type ResourceLines = Array<ResourceLine>

export type SelectedLine = string
export type SelectedLines = Array<SelectedLine>

export type ExpectKeyAndSelectedLines = Array<string>

export type FzfCommandName =
  | "FzfPreviewProjectFiles"
  | "FzfPreviewGitFiles"
  | "FzfPreviewDirectoryFiles"
  | "FzfPreviewGitStatus"
  | "FzfPreviewBuffers"
  | "FzfPreviewAllBuffers"
  | "FzfPreviewProjectOldFiles"
  | "FzfPreviewProjectMruFiles"
  | "FzfPreviewProjectMrwFiles"
  | "FzfPreviewLines"
  | "FzfPreviewBufferLines"
  | "FzfPreviewCtags"
  | "FzfPreviewBufferTags"
  | "FzfPreviewOldFiles"
  | "FzfPreviewMruFiles"
  | "FzfPreviewMrwFiles"
  | "FzfPreviewQuickFix"
  | "FzfPreviewLocationList"
  | "FzfPreviewJumps"
  | "FzfPreviewChanges"
  | "FzfPreviewMarks"
  | "FzfPreviewProjectGrep"
  | "FzfPreviewProjectCommandGrep"
  | "FzfPreviewFromResources"

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
  defaultProcessesName: ProcessesName
  enableConvertForFzf: boolean
  enableDevIcons: boolean
  enablePostProcessCommand: boolean
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

export type ResumeQuery = string | null

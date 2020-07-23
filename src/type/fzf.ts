import { CommandOptions } from "neovim/lib/host/NvimPlugin"
import { Merge } from "type-fest"

import { ProcessesName } from "@/type/process"
import type { Resource } from "@/type/resource"

export type FzfCommandDynamicOption = {
  "--header"?: string
  "--header-lines"?: string
}

export type SelectedLine = string
export type SelectedLines = Array<SelectedLine>

export type ExpectKeyAndSelectedLines = Array<string>

type RemoteFzfCommandName =
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
  | "FzfPreviewFromResources"
  | "FzfPreviewBookmarks"
  | "FzfPreviewYankround"
  | "FzfPreviewVistaCtags"
  | "FzfPreviewVistaBufferCtags"
  | "FzfPreviewBlamePR"

type CocFzfCommandName = "FzfPreviewCocReferences" | "FzfPreviewCocDiagnostics" | "FzfPreviewCocCurrentDiagnostics"

export type FzfCommandName = RemoteFzfCommandName | CocFzfCommandName

export type SourceFuncArgs = {
  args: Array<string>
  extraArgs: Array<string>
}

type FzfCommandBase = {
  sourceFunc: (sourceFuncArgs: SourceFuncArgs) => Promise<Resource>
  sourceFuncArgsParser: (args: string) => SourceFuncArgs
  vimCommandOptions: CommandOptions
  defaultFzfOptionFunc: () =>
    | { [optionName: string]: string | boolean | undefined }
    | Promise<{ [optionName: string]: string | boolean | undefined }>
  defaultProcessesName: ProcessesName
  enableConvertForFzf: boolean
  enableDevIcons: boolean
  enablePostProcessCommand: boolean
  beforeCommandHook?: (args: string) => void
  syntaxCommands?: Array<string>
}

export type RemoteFzfCommand = Merge<
  FzfCommandBase,
  {
    commandName: RemoteFzfCommandName
  }
>

export type CocFzfCommand = Merge<
  FzfCommandBase,
  {
    commandName: CocFzfCommandName
  }
>

export type FzfCommand = RemoteFzfCommand | CocFzfCommand

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
  "--with-nth"?: string
}

export type AddFzfArg = {
  optionName: string
  value?: string
}

export type ResumeQuery = string | null

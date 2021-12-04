import type { CommandOptions } from "neovim/lib/host/NvimPlugin"
import type { Merge, ReadonlyDeep } from "type-fest"

import type {
  GitBranchData,
  GitLogData,
  GitReflogData,
  GitStashData,
  GitStatusData,
  ProcessesName,
  Resource,
} from "@/type"

export type FzfCommandDynamicOption = ReadonlyDeep<{
  "--header"?: string
  "--header-lines"?: string
}>

type SelectedLine = string
export type SelectedLines = ReadonlyArray<SelectedLine>

export type ExpectKeyAndSelectedLines = ReadonlyArray<string>

export type BaseFzfCommandName =
  | "FzfPreviewProjectFiles"
  | "FzfPreviewGitFiles"
  | "FzfPreviewDirectoryFiles"
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
  | "FzfPreviewProjectGrepRecall"
  | "FzfPreviewFromResources"
  | "FzfPreviewCommandPalette"
  | "FzfPreviewGrepHelp"
  | "FzfPreviewGitActions"
  | "FzfPreviewGitStatus"
  | "FzfPreviewGitStatusActions"
  | "FzfPreviewGitBranches"
  | "FzfPreviewGitBranchActions"
  | "FzfPreviewGitLogs"
  | "FzfPreviewGitCurrentLogs"
  | "FzfPreviewGitLogActions"
  | "FzfPreviewGitStashes"
  | "FzfPreviewGitStashActions"
  | "FzfPreviewGitReflogs"
  | "FzfPreviewGitReflogActions"
  | "FzfPreviewVimLspReferences"
  | "FzfPreviewVimLspDiagnostics"
  | "FzfPreviewVimLspCurrentDiagnostics"
  | "FzfPreviewVimLspDefinition"
  | "FzfPreviewVimLspTypeDefinition"
  | "FzfPreviewVimLspImplementation"
  | "FzfPreviewBookmarks"
  | "FzfPreviewYankround"
  | "FzfPreviewVistaCtags"
  | "FzfPreviewVistaBufferCtags"
  | "FzfPreviewMemoList"
  | "FzfPreviewMemoListGrep"
  | "FzfPreviewTodoComments"
  | "FzfPreviewBlamePR"

type CocFzfCommandName =
  | "FzfPreviewCocReferences"
  | "FzfPreviewCocDiagnostics"
  | "FzfPreviewCocCurrentDiagnostics"
  | "FzfPreviewCocDefinition"
  | "FzfPreviewCocTypeDefinition"
  | "FzfPreviewCocImplementations"
  | "FzfPreviewCocOutline"

export type FzfCommandName = BaseFzfCommandName | CocFzfCommandName

export type SourceFuncArgs = ReadonlyDeep<{
  args: ReadonlyArray<string>
}>

type FzfCommandBase = ReadonlyDeep<{
  sourceFunc: (sourceFuncArgs: SourceFuncArgs) => Promise<Resource>
  sourceFuncArgsParser: (args: string) => SourceFuncArgs
  vimCommandOptions: CommandOptions
  defaultFzfOptionFunc: () =>
    | { [optionName: string]: string | boolean | undefined }
    | Promise<{ [optionName: string]: string | boolean | undefined }>
  defaultProcessesName: ProcessesName
  enableConvertForFzf: boolean
  enableDevIcons: boolean
  beforeCommandHook?: (args: string) => void
}>

export type BaseFzfCommand = ReadonlyDeep<
  Merge<
    FzfCommandBase,
    {
      commandName: BaseFzfCommandName
    }
  >
>

type CocFzfCommand = ReadonlyDeep<
  Merge<
    FzfCommandBase,
    {
      commandName: CocFzfCommandName
    }
  >
>

export type FzfCommand = BaseFzfCommand | CocFzfCommand

export type FzfOptions = ReadonlyDeep<{
  "--ansi"?: true
  "--bind"?:
    | ReadonlyArray<{
        key: string
        action: string
      }>
    | string
  "--expect"?: ReadonlyArray<string> | string
  "--history"?: string
  [otherProperty: string]: any // eslint-disable-line @typescript-eslint/no-explicit-any
}>

export type FzfCommandDefinitionDefaultOption = ReadonlyDeep<{
  "--header"?: string
  "--header-lines"?: string
  "--prompt": string
  "--multi"?: true
  "--preview"?: string
  "--preview-window"?: string
  "--no-sort"?: true
  "--delimiter"?: string
  "--phony"?: true
  "--bind"?: string
  "--query"?: string
  "--with-nth"?: string
  "--nth"?: string
  "--keep-right"?: true
}>

export type AddFzfArg = ReadonlyDeep<{
  optionName: string
  value?: string
}>

export type ResumeQuery = string | null

export type Session = {
  gitStatusDataList?: ReadonlyArray<GitStatusData>
  gitBranches?: ReadonlyArray<GitBranchData>
  gitLogs?: ReadonlyArray<GitLogData>
  gitStashes?: ReadonlyArray<GitStashData>
  gitReflogs?: ReadonlyArray<GitReflogData>
}

export type SessionToken = string

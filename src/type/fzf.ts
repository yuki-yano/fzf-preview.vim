import type { CommandOptions } from "neovim/lib/host/NvimPlugin"
import type { Merge } from "type-fest"

import type { ProcessesName } from "@/type/process"
import type { GitBranchData, GitLogData, GitReflogData, GitStashData, GitStatusData, Resource } from "@/type/resource"

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
  | "FzfPreviewCommandPalette"
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
  | "FzfPreviewBookmarks"
  | "FzfPreviewYankround"
  | "FzfPreviewVistaCtags"
  | "FzfPreviewVistaBufferCtags"
  | "FzfPreviewBlamePR"

type CocFzfCommandName =
  | "FzfPreviewCocReferences"
  | "FzfPreviewCocDiagnostics"
  | "FzfPreviewCocCurrentDiagnostics"
  | "FzfPreviewCocTypeDefinitions"

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
  beforeCommandHook?: (args: string) => void
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
  "--header"?: string
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
  "--keep-right"?: true
}

export type AddFzfArg = {
  optionName: string
  value?: string
}

export type ResumeQuery = string | null

export type Session = {
  gitStatusDataList?: Array<GitStatusData>
  gitBranches?: Array<GitBranchData>
  gitLogs?: Array<GitLogData>
  gitStashes?: Array<GitStashData>
  gitReflogs?: Array<GitReflogData>
}

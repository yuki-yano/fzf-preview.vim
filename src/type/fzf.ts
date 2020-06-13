import { CommandOptions } from "neovim/lib/host/NvimPlugin"

import type { Processes } from "@/type"
import { SelectedLine } from "@/type/process"

export type ResourceLine = string
export type ResourceLines = Array<ResourceLine>

export type ExpectKeyAndSelectedLines = Array<string>

export type FzfCommandName =
  | "TSFzfPreviewProjectFiles"
  | "TSFzfPreviewGitFiles"
  | "TSFzfPreviewDirectoryFiles"
  | "TSFzfPreviewGitStatus"
  | "TSFzfPreviewBuffers"
  | "TSFzfPreviewAllBuffers"
  | "TSFzfPreviewProjectOldFiles"

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
  defaultFzfOptionFunc: () => { [optionName: string]: string | boolean }
  defaultProcesses: Processes
  enableDevIcons: boolean
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

export type AddFzfArgs = {
  optionName: string
  value?: string
}

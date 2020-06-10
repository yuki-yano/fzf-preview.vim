import { CommandOptions } from "neovim/lib/host/NvimPlugin"

import type { Processors } from "@/type"

export type FzfCommandName =
  | "TSFzfPreviewProjectFiles"
  | "TSFzfPreviewGitFiles"
  | "TSFzfPreviewDirectoryFiles"
  | "TSFzfPreviewGitStatus"
  | "TSFzfPreviewBuffers"

export type SourceFuncArgs = {
  args: Array<string>
  extraArgs: Array<string>
}

export type FzfCommand = {
  commandName: FzfCommandName
  sourceFunc: (sourceFuncArgs: SourceFuncArgs) => Promise<Array<string>>
  sourceFuncArgsParser?: (args: string) => SourceFuncArgs
  vimCommandOptions: CommandOptions
  defaultFzfOptionFunc: () => { [optionName: string]: string | boolean }
  defaultProcessors: Processors
  enableDevIcons: boolean
  optionalUnnecessaryPrefixLength?: number
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

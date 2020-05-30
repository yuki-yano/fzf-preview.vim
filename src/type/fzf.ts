import { CommandOptions } from "neovim/lib/host/NvimPlugin"

export type FzfCommandName = "TSFzfPreviewProjectFiles"
export type HandlerName = "FzfPreviewHandleResource"

export type FzfCommand = {
  commandName: FzfCommandName
  sourceFunc: () => Array<string>
  handlerName: HandlerName
  handlerFunction: (lines: Array<string>) => void
  vimCommandOptions: CommandOptions
  defaultFzfOptionFunc: () => { [optionName: string]: string | boolean }
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

export type AddedFzfArgs = {
  optionName: string
  value?: string
}

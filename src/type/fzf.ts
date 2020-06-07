import { CommandOptions } from "neovim/lib/host/NvimPlugin"

import type { Processors } from "@/type"

export type FzfCommandName = "TSFzfPreviewProjectFiles"
export type HandlerName = "FzfPreviewHandleResource"

export type FzfCommand = {
  commandName: FzfCommandName
  sourceFunc: () => Promise<Array<string>>
  handlerName: HandlerName
  handlerFunction: (lines: Array<string>) => void
  vimCommandOptions: CommandOptions
  defaultFzfOptionFunc: () => { [optionName: string]: string | boolean }
  defaultProcessors: Processors
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

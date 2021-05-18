import type { BaseFzfCommandName } from "@/type"

export type RpcExecCommandParams = {
  commandName: BaseFzfCommandName
  args?: string
}

export type RpcCallProcessParams = {
  lines: ReadonlyArray<string>
}

export type RpcExecProcessCallbackParams = {
  processName: string
  lines: ReadonlyArray<string>
}

export type DispatchResumeQueryParams = {
  commandName: BaseFzfCommandName
  query: string
}

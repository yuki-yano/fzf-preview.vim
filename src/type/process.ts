import type { PROCESSES_NAME } from "@/const/fzf-processes"
import type { ResourceData } from "@/type/resource"

export type CallbackLine = string
export type CallbackLines = Array<CallbackLine>

export type Process = {
  name: string
  key: string
  execute: (lines: Array<ResourceData>) => void | Promise<void>
}

export type Processes = Array<Process>

export type ProcessesName = typeof PROCESSES_NAME[number]

export type ProcessesDefinition = Array<{
  name: ProcessesName
  processes: Processes
}>

export type UserProcesses =
  | {
      type: "custom_processes_variable"
      value: ProcessesName
    }
  | {
      type: "global_variable"
      value: string
    }

export type CustomProcessesVimVariable = {
  [key in ProcessesName]: {
    [key: string]: string
  }
}

export type SingleLineConsumer = {
  consume: (line: ResourceData) => Promise<void>
  kind: "single"
}
export type BulkLineConsumer = {
  consume: (lines: Array<ResourceData>) => Promise<void>
  kind: "bulk"
}
export type LineConsumer = SingleLineConsumer | BulkLineConsumer

export type CreateProcessCreator = (
  processesName: ProcessesName
) => (expectKey: string, lineConsumer: LineConsumer) => Process

export type OpenCommand = "edit" | "split" | "vsplit" | "tabedit" | "drop"

import type { ReadonlyDeep } from "type-fest"

import type { PROCESSES_NAME } from "@/const/fzf-processes"
import type { ResourceData } from "@/type/resource"

export type CallbackLine = string
export type CallbackLines = ReadonlyArray<CallbackLine>

export type Process = ReadonlyDeep<{
  name: string
  key: string
  execute: (lines: ReadonlyArray<ResourceData>) => void | Promise<void>
}>

export type Processes = ReadonlyDeep<ReadonlyArray<Process>>

export type ProcessesName = typeof PROCESSES_NAME[number]

export type ProcessesDefinition = ReadonlyDeep<
  ReadonlyArray<{
    name: ProcessesName
    processes: Processes
  }>
>

export type UserProcesses =
  | {
      type: "custom_processes_variable"
      value: ProcessesName
    }
  | {
      type: "global_variable"
      value: string
    }

export type CustomProcessesVimVariable = ReadonlyDeep<{
  [key in ProcessesName]: {
    [key: string]: string
  }
}>

export type SingleLineConsumer = ReadonlyDeep<{
  consume: (line: ReadonlyDeep<ResourceData>) => Promise<void>
  kind: "single"
}>

type BulkLineConsumer = ReadonlyDeep<{
  consume: (lines: ReadonlyArray<ResourceData>) => Promise<void>
  kind: "bulk"
}>

type LineConsumer = SingleLineConsumer | BulkLineConsumer

export type CreateProcessCreator = (
  processesName: ProcessesName
) => (expectKey: string, lineConsumer: LineConsumer) => Process

export type OpenCommand = "edit" | "split" | "vsplit" | "tabedit" | "drop"

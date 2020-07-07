import { PROCESSES_NAME } from "@/const/fzf-processes"

export type ConvertedLine = string
export type ConvertedLines = Array<ConvertedLine>

export type Process = {
  name: string
  key: string
  execute: (lines: ConvertedLines) => void | Promise<void>
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

export type LineConsumer = SingleLineConsumer | BulkLineConsumer
export type SingleLineConsumer = {
  consume: (line: ConvertedLine) => Promise<void>
  kind: "single"
}
export type BulkLineConsumer = {
  consume: (lines: ConvertedLines) => Promise<void>
  kind: "bulk"
}

export type CreateProcess = (processesName: ProcessesName) => (expectKey: string, lineConsumer: LineConsumer) => Process

export type OpenCommand = "edit" | "split" | "vsplit" | "tabedit" | "drop"

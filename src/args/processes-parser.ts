import { isObject } from "lodash"

import { argsParser } from "@/args/parser"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import type { ArgsOptions, CustomProcessesVimVariable, ProcessesName, UserProcesses } from "@/type"

const parseOptions = (options: ArgsOptions): UserProcesses | null => {
  const processesArgs = options.processes

  if (processesArgs == null) {
    return null
  }

  if (typeof processesArgs === "string") {
    return { type: "global_variable", value: processesArgs }
  }

  throw new Error("--processes option can only be used once")
}

export const parseProcesses = (defaultProcessesName: ProcessesName, args: string): UserProcesses | undefined => {
  const parser = argsParser()
  const options = parser.parse(args)

  const parsedOptions = parseOptions(options)
  if (parsedOptions != null) {
    return parsedOptions
  }

  const customProcessesDictionary = globalVariableSelector("fzfPreviewCustomProcesses")
  if (
    isObject(customProcessesDictionary) &&
    isObject((customProcessesDictionary as CustomProcessesVimVariable)[defaultProcessesName])
  ) {
    return { type: "custom_processes_variable", value: defaultProcessesName }
  }

  return undefined
}

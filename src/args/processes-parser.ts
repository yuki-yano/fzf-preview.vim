import { argsParser } from "@/args/parser"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import type { ArgsOptions, ProcessesName } from "@/type"

const parseOptions = (options: ArgsOptions) => {
  const processesArgs = options.processes

  if (typeof processesArgs === "string" || processesArgs === undefined) {
    return processesArgs
  }

  throw new Error("--processes option can only be used once")
}

export const parseProcesses = (defaultProcessesName: ProcessesName, args: string): string | undefined => {
  const parser = argsParser()
  const options = parser.parse(args)

  if (parseOptions(options) != null) {
    return parseOptions(options)
  }

  switch (defaultProcessesName) {
    case "open-file": {
      const customProcesses = globalVariableSelector("fzfPreviewCustomOpenFileProcesses")
      if (customProcesses !== 0) {
        if (typeof customProcesses === "object" && !Array.isArray(customProcesses)) {
          return "fzf_preview_custom_open_file_processes"
        } else {
          throw new Error(
            `Custom open file processes must be dictionary variable. Value: "${customProcesses.toString()}"`
          )
        }
      }

      return undefined
    }

    default: {
      return undefined
    }
  }
}

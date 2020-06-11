import { argsParser } from "@/args/parser"
import type { ArgsOptions } from "@/type"

const parseOptions = (options: ArgsOptions) => {
  const processesArgs = options.processes

  if (typeof processesArgs === "string" || processesArgs === undefined) {
    return processesArgs
  }

  throw new Error("--processes option can only be used once")
}

export const parseProcesses = (args: string) => {
  const parser = argsParser()
  const options = parser.parse(args)

  return parseOptions(options)
}

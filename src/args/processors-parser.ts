import { argsParser } from "@/args/parser"
import type { ArgsOptions } from "@/type"

const parseOptions = (options: ArgsOptions) => {
  const processorsArgs = options.processors

  if (typeof processorsArgs === "string" || processorsArgs === undefined) {
    return processorsArgs
  }

  throw new Error("--processors option can only be used once")
}

export const parseProcessors = (args: string) => {
  const parser = argsParser()
  const options = parser.parse(args)

  return parseOptions(options)
}

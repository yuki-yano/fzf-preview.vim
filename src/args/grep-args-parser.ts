import { argsParser } from "@/args/parser"
import type { SourceFuncArgs } from "@/type"

export const parseGrepArgs = (args: string): SourceFuncArgs => {
  const parser = argsParser()
  const options = parser.parse(args)

  return {
    args: options._.length > 0 ? options._ : [],
    extraArgs: [],
  }
}

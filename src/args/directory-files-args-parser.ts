import { argsParser } from "@/args/parser"
import type { SourceFuncArgs } from "@/type"

export const parseDictionaryFilesArgs = (args: string): SourceFuncArgs => {
  const parser = argsParser()
  const options = parser.parse(args)

  return {
    args: options._.length > 0 ? [options._[0]] : [],
    extraArgs: [],
  }
}

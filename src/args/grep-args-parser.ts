import { argsParser } from "@/args/parser"
import type { SourceFuncArgs } from "@/type"

export const parseGrepArgs = (args: string): SourceFuncArgs => {
  const parser = argsParser()
  const options = parser.parse(args)

  const grepArgs = options._.map((resource) => (typeof resource === "number" ? resource.toString() : resource))

  return {
    args: grepArgs,
  }
}

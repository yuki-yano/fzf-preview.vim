import { argsParser } from "@/args/parser"
import type { SourceFuncArgs } from "@/type"

export const parseDictionaryFilesArgs = (args: string): SourceFuncArgs => {
  const parser = argsParser()
  const options = parser.parse(args)

  const directories = options._.map((resource) => (typeof resource === "number" ? resource.toString() : resource))

  return {
    args: directories.length > 0 ? [directories[0]] : [],
  }
}

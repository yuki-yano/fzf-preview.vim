import { argsParser } from "@/args/parser"
import { FILE_RESOURCES } from "@/const/fzf-option"
import type { SourceFuncArgs } from "@/type"

export const parseResources = (args: string): SourceFuncArgs => {
  const parser = argsParser()
  const options = parser.parseSync(args)

  const resources = options._.map((resource) => (typeof resource === "number" ? resource.toString() : resource))

  if (resources.length === 0) {
    throw new Error("Select one or more resources")
  }

  if (!resources.every((resource) => (FILE_RESOURCES as ReadonlyArray<string>).includes(resource))) {
    throw new Error(`Invalid resource: "${resources.join(", ")}"`)
  }

  return {
    args: resources,
  }
}

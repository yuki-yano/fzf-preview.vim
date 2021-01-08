import { flatMap } from "lodash"

import { argsParser } from "@/args/parser"
import { FILE_RESOURCES } from "@/const/fzf-option"
import type { SourceFuncArgs } from "@/type"

export const parseResources = (args: string): SourceFuncArgs => {
  const parser = argsParser()
  const options = parser.parse(args)

  // There is a bug that comma-separated arguments come in when using coc on windows.
  const resources = flatMap(options._, (resource) => resource.split(","))

  if (resources.length === 0) {
    throw new Error("Select one or more resources")
  }

  if (!resources.every((resource) => (FILE_RESOURCES as ReadonlyArray<string>).includes(resource))) {
    throw new Error(`Invalid resource: "${resources.join(", ")}"`)
  }

  return {
    args: resources,
    extraArgs: [],
  }
}

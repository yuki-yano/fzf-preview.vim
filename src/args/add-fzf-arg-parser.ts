import { argsParser } from "@/args/parser"
import type { AddFzfArg, ArgsOptions } from "@/type"

const optionsToAddFzfArg = (options: ArgsOptions): ReadonlyArray<string> => {
  if (options["add-fzf-arg"] != null && Array.isArray(options["add-fzf-arg"])) {
    return options["add-fzf-arg"] as ReadonlyArray<string>
  }
  if (options["add-fzf-arg"] != null && typeof options["add-fzf-arg"] === "string") {
    return [options["add-fzf-arg"]]
  }

  return []
}

const parseOptions = (options: ArgsOptions) => {
  const addFzfArg = optionsToAddFzfArg(options)

  const notExistsValueOptions: ReadonlyArray<AddFzfArg> = addFzfArg
    .map((arg) => /(.+)$/.exec(arg))
    .filter((match): match is RegExpExecArray => match != null && !match[0].includes("="))
    .map((match) => {
      return { optionName: match[1] }
    })

  const existsValueOptions: ReadonlyArray<AddFzfArg> = addFzfArg
    .map((arg) => /(.+)=(.+)$/.exec(arg))
    .filter((match): match is RegExpExecArray => match != null)
    .map((match) => ({ optionName: match[1], value: match[2] }))

  return [...notExistsValueOptions, ...existsValueOptions]
}

export const parseAddFzfArg = (args: string): ReadonlyArray<AddFzfArg> => {
  const parser = argsParser()
  const options = parser.parse(args)

  return parseOptions(options)
}

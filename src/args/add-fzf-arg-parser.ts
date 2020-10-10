import { argsParser } from "@/args/parser"
import type { AddFzfArg, ArgsOptions } from "@/type"

const optionsToAddFzfArg = (options: ArgsOptions): Array<string> => {
  if (options["add-fzf-arg"] && Array.isArray(options["add-fzf-arg"])) {
    return options["add-fzf-arg"] as Array<string>
  }
  if (options["add-fzf-arg"] && typeof options["add-fzf-arg"] === "string") {
    return [options["add-fzf-arg"]]
  }

  return []
}

const parseOptions = (options: ArgsOptions) => {
  const addFzfArg = optionsToAddFzfArg(options)

  const notExistsValueOptions: Array<AddFzfArg> = addFzfArg
    .map((arg) => /(--?\S+)$/.exec(arg))
    .filter((match): match is RegExpExecArray => match != null && !match[0].includes("="))
    .map((match) => {
      return { optionName: match[1] }
    })

  const existsValueOptions: Array<AddFzfArg> = addFzfArg
    .map((arg) => /(--?\S+)=(.+)$/.exec(arg))
    .filter((match): match is RegExpExecArray => match != null)
    .map((match) => ({ optionName: match[1], value: match[2] }))

  return [...notExistsValueOptions, ...existsValueOptions]
}

export const parseAddFzfArg = (args: string): Array<AddFzfArg> => {
  const parser = argsParser()
  const options = parser.parse(args)

  return parseOptions(options)
}

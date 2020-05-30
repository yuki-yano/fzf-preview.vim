import { AddedFzfArgs } from "@/type"

const parseAddFzfArgs = (args: Array<string>) => {
  const regexp = /^-add-fzf-args=(\S+)$/
  return args
    .map((arg) => regexp.exec(arg))
    .filter((match): match is RegExpExecArray => match !== null)
    .map((match) => match[1])
}

export const parseFzfOption = (args: Array<string>) => {
  const stringFzfArgs = parseAddFzfArgs(args)

  const notExistValueOptions: Array<AddedFzfArgs> = stringFzfArgs
    .map((arg) => /(--?\S+)$/.exec(arg))
    .filter((match): match is RegExpExecArray => match !== null && !match[0].includes("="))
    .map((match) => {
      return { optionName: match[1] }
    })

  const existValueOptions: Array<AddedFzfArgs> = stringFzfArgs
    .map((arg) => /(--?\S+)=(.+)$/.exec(arg))
    .filter((match): match is RegExpExecArray => match !== null)
    .map((match) => {
      return { optionName: match[1], value: match[2] }
    })

  return notExistValueOptions.concat(existValueOptions)
}

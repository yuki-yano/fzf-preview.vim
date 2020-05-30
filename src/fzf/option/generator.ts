import { FzfOptions } from "@/type"
import { parseFzfOption } from "@/args/fzf-option-parser"

const defaultBind = [
  {
    key: "ctrl-d",
    action: "preview-page-down"
  },
  {
    key: "ctrl-u",
    action: "preview-page-up"
  },
  {
    key: "?",
    action: "toggle-preview"
  }
]

const defaultOptions: FzfOptions = {
  "--ansi": true,
  // alt-enter is workaround
  "--expect": ["alt-enter"],
  "--bind": defaultBind
} as const

export const generateOptions = (fzfCommandDefaultOptions: FzfOptions, commandArgs: Array<string>) => {
  const fzfCommandOptions = { ...defaultOptions, ...fzfCommandDefaultOptions }
  const userOptions = parseFzfOption(commandArgs)

  userOptions.forEach((userOption) => {
    fzfCommandOptions[userOption.optionName] = userOption.value
  })

  return fzfCommandOptions
}

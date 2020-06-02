import type { FzfOptions, AddFzfArgs } from "@/type"

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

export const generateOptions = (fzfCommandDefaultOptions: FzfOptions, userOptions: Array<AddFzfArgs>) => {
  const fzfCommandOptions = { ...defaultOptions, ...fzfCommandDefaultOptions }

  userOptions.forEach((userOption) => {
    fzfCommandOptions[userOption.optionName] = userOption.value
  })

  return fzfCommandOptions
}

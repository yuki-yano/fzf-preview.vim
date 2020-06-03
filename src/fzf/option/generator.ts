import { VimValue } from "neovim/lib/types/VimValue"

import type { FzfOptions, AddFzfArgs } from "@/type"
import { getVar } from "@/plugin"

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

export const defaultOptions: FzfOptions = {
  "--ansi": true,
  // alt-enter is workaround
  "--expect": ["alt-enter"],
  "--bind": defaultBind
} as const

const getExpectFromUserProcessor = async (userProcessorsName: string, getVarFromPlugin: typeof getVar = getVar) => {
  const processors = await getVarFromPlugin(userProcessorsName)

  if (typeof processors === "object" && !Array.isArray(processors)) {
    return {
      "--expect": Object.entries(processors).map(([key]) => key)
    }
  }

  throw new Error("--processors must be dictionary variable")
}

type OptionsArgs = {
  fzfCommandDefaultOptions: FzfOptions
  userOptions: Array<AddFzfArgs>
  userProcessorsName?: string
}

export const generateOptions = async (
  { fzfCommandDefaultOptions, userProcessorsName, userOptions }: OptionsArgs,
  getVarFromPlugin: typeof getVar = getVar
) => {
  const userExpectFromProcessor: FzfOptions = userProcessorsName
    ? await getExpectFromUserProcessor(userProcessorsName, getVarFromPlugin)
    : {}

  const fzfCommandOptions = {
    ...defaultOptions,
    ...fzfCommandDefaultOptions,
    ...userExpectFromProcessor
  }

  userOptions.forEach((userOption) => {
    fzfCommandOptions[userOption.optionName] = userOption.value
  })

  return fzfCommandOptions
}

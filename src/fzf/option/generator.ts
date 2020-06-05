import type { FzfOptions, AddFzfArgs, Processors } from "@/type"
import { pluginGetVar } from "@/plugin"

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
] as const

export const defaultOptions: FzfOptions = {
  "--ansi": true,
  // alt-enter is workaround
  "--expect": ["alt-enter"],
  "--bind": defaultBind
} as const

const getExpectFromUserProcessor = async (
  userProcessorsName: string,
  getVarFromPlugin: typeof pluginGetVar = pluginGetVar
) => {
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
  defaultProcessors: Processors
  userProcessorsName?: string
  userOptions: Array<AddFzfArgs>
}

export const generateOptions = async (
  { fzfCommandDefaultOptions, defaultProcessors, userProcessorsName, userOptions }: OptionsArgs,
  getVarFromPlugin: typeof pluginGetVar = pluginGetVar
) => {
  const expectFromDefaultProcessor: FzfOptions = { "--expect": Object.entries(defaultProcessors).map(([key]) => key) }

  const userExpectFromProcessor: FzfOptions = userProcessorsName
    ? await getExpectFromUserProcessor(userProcessorsName, getVarFromPlugin)
    : {}

  const fzfCommandOptions = {
    ...defaultOptions,
    ...fzfCommandDefaultOptions,
    ...expectFromDefaultProcessor,
    ...userExpectFromProcessor
  }

  userOptions.forEach((userOption) => {
    fzfCommandOptions[userOption.optionName] = userOption.value
  })

  return fzfCommandOptions
}

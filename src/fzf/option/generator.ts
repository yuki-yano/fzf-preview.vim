import { pluginGetVar } from "@/plugin"
import type { AddFzfArgs, FzfOptions, Processes } from "@/type"

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

const getExpectFromUserProcesses = async (userProcessesName: string) => {
  const processes = await pluginGetVar(userProcessesName)

  if (typeof processes === "object" && !Array.isArray(processes)) {
    return {
      "--expect": Object.entries(processes).map(([key]) => key)
    }
  }

  throw new Error("--processes must be dictionary variable")
}

type OptionsArgs = {
  fzfCommandDefaultOptions: FzfOptions
  defaultProcesses: Processes
  userProcessesName?: string
  userOptions: Array<AddFzfArgs>
}

export const generateOptions = async ({
  fzfCommandDefaultOptions,
  defaultProcesses,
  userProcessesName,
  userOptions
}: OptionsArgs) => {
  const expectFromDefaultProcess: FzfOptions = { "--expect": Object.entries(defaultProcesses).map(([key]) => key) }

  const userExpectFromProcesses: FzfOptions = userProcessesName
    ? await getExpectFromUserProcesses(userProcessesName)
    : {}

  const fzfCommandOptions = {
    ...defaultOptions,
    ...fzfCommandDefaultOptions,
    ...expectFromDefaultProcess,
    ...userExpectFromProcesses
  }

  userOptions.forEach((userOption) => {
    fzfCommandOptions[userOption.optionName] = userOption.value
  })

  return fzfCommandOptions
}

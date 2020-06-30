import { globalVariableSelector } from "@/module/selector/vim-variable"
import { pluginGetVar } from "@/plugin"
import type { AddFzfArgs, FzfOptions, Processes, ResumeQuery } from "@/type"

const defaultBind = [
  {
    key: "ctrl-d",
    action: "preview-page-down",
  },
  {
    key: "ctrl-u",
    action: "preview-page-up",
  },
  {
    key: "?",
    action: "toggle-preview",
  },
] as const

export const defaultOptions: FzfOptions = {
  "--ansi": true,
  // alt-enter is workaround
  "--expect": ["alt-enter"],
  "--bind": defaultBind,
} as const

const getExpectFromUserProcesses = async (userProcessesName: string) => {
  const userProcesses = await pluginGetVar(userProcessesName)

  if (typeof userProcesses === "object" && !Array.isArray(userProcesses)) {
    return {
      "--expect": Object.entries(userProcesses)
        .map(([key]) => key)
        .filter((key) => key !== "enter"),
    }
  }

  throw new Error("--processes must be dictionary variable")
}

type OptionsArgs = {
  fzfCommandDefaultOptions: FzfOptions
  defaultProcesses: Processes
  userProcessesName?: string
  userOptions: Array<AddFzfArgs>
  resumeQuery?: ResumeQuery
}

export const generateOptions = async ({
  fzfCommandDefaultOptions,
  defaultProcesses,
  userProcessesName,
  userOptions,
  resumeQuery,
}: OptionsArgs): Promise<FzfOptions> => {
  const expectFromDefaultProcess: FzfOptions = {
    "--expect": defaultProcesses.map(({ key }) => key).filter((key) => key !== "enter"),
  }

  const colorOption: FzfOptions =
    globalVariableSelector("fzfPreviewFzfColorOption") === ""
      ? {}
      : { "--color": `"${globalVariableSelector("fzfPreviewFzfColorOption") as string}"` }

  const userExpectFromProcesses: FzfOptions = userProcessesName
    ? await getExpectFromUserProcesses(userProcessesName)
    : {}

  const resumeQueryOption: FzfOptions = resumeQuery == null ? {} : { "--query": `"${resumeQuery}"` }

  const fzfCommandOptions = {
    ...defaultOptions,
    ...fzfCommandDefaultOptions,
    ...expectFromDefaultProcess,
    ...colorOption,
    ...userExpectFromProcesses,
    ...resumeQueryOption,
  }

  userOptions.forEach((userOption) => {
    fzfCommandOptions[userOption.optionName] = userOption.value
  })

  return fzfCommandOptions
}

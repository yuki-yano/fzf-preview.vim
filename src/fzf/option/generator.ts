import expandTilde from "expand-tilde"
import { isObject } from "lodash"

import { PREVIEW_WINDOW_LAYOUT_CHANGE_SIZE } from "@/const/fzf-option"
import { globalVariableSelector, vimOptionsSelector } from "@/module/selector/vim-variable"
import { pluginGetVar } from "@/plugin"
import type { AddFzfArg, CustomProcessesVimVariable, FzfOptions, Processes, ResumeQuery, UserProcesses } from "@/type"

const defaultBind = [
  {
    key: "ctrl-d",
    action: "preview-half-page-down",
  },
  {
    key: "ctrl-u",
    action: "preview-half-page-up",
  },
  {
    key: "?",
    action: "toggle-preview",
  },
] as const

const defaultOptions: FzfOptions = {
  "--ansi": true,
  // alt-enter is workaround
  "--expect": ["alt-enter"],
  "--bind": defaultBind,
  "--with-nth": '"2.."',
  "--no-separator": true,
} as const

const getUserDefaultOptions = (): FzfOptions => {
  const userDefaultOptions = globalVariableSelector("fzfPreviewDefaultFzfOptions")
  if (!isObject(userDefaultOptions) || Array.isArray(userDefaultOptions)) {
    throw new Error("g:fzf_preview_default_fzf_options must be dictionary variable.")
  }

  return Object.fromEntries(
    Object.entries(userDefaultOptions).map(([k, v]) => {
      if (typeof v === "string") {
        return [k, `"${v}"`]
      }

      return [k, v]
    })
  )
}

const isCustomProcessesVimVariable = (
  variable: unknown,
  userProcesses: UserProcesses
): variable is CustomProcessesVimVariable => {
  if (userProcesses.type !== "custom_processes_variable") {
    return false
  }

  return isObject(variable) && isObject((variable as CustomProcessesVimVariable)[userProcesses.value])
}

const getExpectFromDefaultProcesses = (defaultProcesses: Processes): FzfOptions => {
  return { "--expect": defaultProcesses.map(({ key }) => key).filter((key) => key !== "enter") }
}

// eslint-disable-next-line complexity
const getPreviewWindowOption = (fzfCommandDefaultOptions: FzfOptions): FzfOptions => {
  const defaultPreviewWindowOption =
    fzfCommandDefaultOptions["--preview-window"] != null &&
    typeof fzfCommandDefaultOptions["--preview-window"] === "string"
      ? `${fzfCommandDefaultOptions["--preview-window"]}`
      : null

  const previewWindowOptionVimValue = globalVariableSelector("fzfPreviewFzfPreviewWindowOption")

  if (previewWindowOptionVimValue != null && previewWindowOptionVimValue !== "") {
    if (defaultPreviewWindowOption != null) {
      return {
        "--preview-window": `"${defaultPreviewWindowOption}:${previewWindowOptionVimValue as string}"`,
      }
    } else {
      return {
        "--preview-window": `"${previewWindowOptionVimValue as string}"`,
      }
    }
  }

  const columns = vimOptionsSelector("columns")
  if (columns < PREVIEW_WINDOW_LAYOUT_CHANGE_SIZE) {
    if (defaultPreviewWindowOption != null) {
      return { "--preview-window": `"${defaultPreviewWindowOption}:down:50%"` }
    } else {
      return { "--preview-window": '"down:50%"' }
    }
  } else if (defaultPreviewWindowOption != null) {
    return { "--preview-window": defaultPreviewWindowOption }
  } else {
    return {}
  }
}

const getPreviewKeyBindings = (): FzfOptions => {
  const previewKeyBindings = globalVariableSelector("fzfPreviewPreviewKeyBindings")

  return previewKeyBindings == null || previewKeyBindings === ""
    ? {}
    : { "--bind": `"${previewKeyBindings as string}"` }
}

const getColorOption = (): FzfOptions => {
  const colorOptionVimValue = globalVariableSelector("fzfPreviewFzfColorOption")

  return colorOptionVimValue == null || colorOptionVimValue === ""
    ? {}
    : { "--color": `"${colorOptionVimValue as string}"` }
}

const getExpectFromUserProcesses = async (userProcesses: UserProcesses | undefined): Promise<FzfOptions> => {
  if (userProcesses == null) {
    return {}
  }

  if (userProcesses.type === "global_variable") {
    const userProcessesGlobalVariable = await pluginGetVar(userProcesses.value)

    if (isObject(userProcessesGlobalVariable)) {
      return {
        "--expect": Object.entries(userProcessesGlobalVariable)
          .map(([key]) => key)
          .filter((key) => key !== "enter"),
      }
    }
  }

  if (userProcesses.type === "custom_processes_variable") {
    const userProcessesCustomVariable = globalVariableSelector("fzfPreviewCustomProcesses")

    if (isCustomProcessesVimVariable(userProcessesCustomVariable, userProcesses)) {
      return {
        "--expect": Object.entries(userProcessesCustomVariable[userProcesses.value])
          .map(([key]) => key)
          .filter((key) => key !== "enter"),
      }
    }
  }

  throw new Error("--processes must be dictionary variable")
}

type OptionsArgs = {
  fzfCommandDefaultOptions: FzfOptions
  dynamicOptions?: FzfOptions
  defaultProcesses: Processes
  userProcesses?: UserProcesses
  userOptions: ReadonlyArray<AddFzfArg>
  historyOption: {
    commandName: string
    historyDir: string | false
  }
  resumeQuery?: ResumeQuery
}

export const generateOptions = async ({
  fzfCommandDefaultOptions,
  dynamicOptions,
  defaultProcesses,
  userProcesses,
  userOptions,
  historyOption: { commandName, historyDir },
  resumeQuery,
}: OptionsArgs): Promise<FzfOptions> => {
  const historyOption: FzfOptions =
    typeof historyDir === "string" ? { "--history": `"${expandTilde(historyDir)}/${commandName}"` } : {}
  const resumeQueryOption: FzfOptions = resumeQuery == null ? {} : { "--query": `"${resumeQuery}"` }

  const fzfCommandOptions = {
    ...defaultOptions,
    ...getUserDefaultOptions(),
    ...fzfCommandDefaultOptions,
    ...dynamicOptions,
    ...getExpectFromDefaultProcesses(defaultProcesses),
    ...getPreviewWindowOption(fzfCommandDefaultOptions),
    ...getPreviewKeyBindings(),
    ...getColorOption(),
    ...(await getExpectFromUserProcesses(userProcesses)),
    ...historyOption,
    ...resumeQueryOption,
  }

  userOptions.forEach((userOption) => {
    fzfCommandOptions[userOption.optionName] = userOption.value
  })

  return fzfCommandOptions
}

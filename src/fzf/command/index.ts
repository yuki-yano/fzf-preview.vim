import { parseAddFzfArg, parseGrepArgs, parseProcesses, parseResume } from "@/args"
import { parseExperimental } from "@/args/experimental-parser"
import { parseSession } from "@/args/session-parser"
import { TEMPORALLY_DATA_FILE_PATH } from "@/const/system"
import { executeExperimentalFast } from "@/fzf/command/execute-fast"
import { executeNormal } from "@/fzf/command/execute-normal"
import { processesDefinition } from "@/fzf/process"
import { recallModule } from "@/module/recall"
import { recallSelector } from "@/module/selector/recall"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import { sessionModule } from "@/module/session"
import { syncVimOptions, syncVimVariable } from "@/plugin/sync-vim-variable"
import { dispatch } from "@/store"
import { initializeDataTransferFile } from "@/system/file"
import type { FzfCommand } from "@/type"

const getDefaultProcesses = (defaultProcessesName: string) => {
  const targetProcessesDefinition = processesDefinition.find((define) => define.name === defaultProcessesName)
  if (targetProcessesDefinition == null) {
    throw new Error(`Processes not found: "${defaultProcessesName}"`)
  }

  return targetProcessesDefinition.processes
}

const getDefaultOptions = async (defaultFzfOptionFunc: FzfCommand["defaultFzfOptionFunc"]) => {
  const defaultOptions = defaultFzfOptionFunc()

  return defaultOptions instanceof Promise ? await defaultOptions : defaultOptions
}

export const executeCommand = async (
  args: string,
  {
    commandName,
    sourceFunc,
    sourceFuncArgsParser,
    defaultFzfOptionFunc,
    defaultProcessesName,
    enableConvertForFzf,
    enableDevIcons: enableDevIconsCommandSetting,
    beforeCommandHook,
  }: FzfCommand
): Promise<void> => {
  await Promise.all([syncVimVariable(), syncVimOptions()])

  initializeDataTransferFile(TEMPORALLY_DATA_FILE_PATH)

  if (beforeCommandHook != null) {
    beforeCommandHook(args)
  }

  // For ProjectGrepRecall
  if (commandName === "FzfPreviewProjectGrep") {
    dispatch(
      recallModule.actions.setGrepArgs({
        grepArgs: parseGrepArgs(args).args.join(" "),
      })
    )
  }
  if (commandName === "FzfPreviewProjectGrepRecall") {
    // eslint-disable-next-line no-param-reassign
    args = `${args} ${recallSelector("grepArgs")}`
    // eslint-disable-next-line no-param-reassign
    commandName = "FzfPreviewProjectGrep"
  }

  const addFzfOptions = parseAddFzfArg(args)
  const userProcesses = parseProcesses(defaultProcessesName, args)
  const fzfCommandDefaultOptions = await getDefaultOptions(defaultFzfOptionFunc)
  const defaultProcesses = getDefaultProcesses(defaultProcessesName)
  const resumeQuery = parseResume(commandName, args)
  const currentSession = parseSession(args)
  const experimental = parseExperimental(args)

  if (currentSession != null) {
    dispatch(sessionModule.actions.setCurrentSession({ session: currentSession }))
  }

  const historyDir = globalVariableSelector("fzfPreviewHistoryDir") as string | false
  const historyOption = {
    commandName,
    historyDir,
  }
  const sourceFuncArgs = sourceFuncArgsParser(args)

  const executeArgs = {
    sourceFunc,
    sourceFuncArgs,
    enableDevIconsCommandSetting,
    commandName,
    userProcesses,
    fzfCommandDefaultOptions,
    defaultProcesses,
    addFzfOptions,
    historyOption,
    resumeQuery,
    enableConvertForFzf,
  }

  if (experimental.fast) {
    await executeExperimentalFast(executeArgs)
  } else {
    await executeNormal(executeArgs)
  }
}

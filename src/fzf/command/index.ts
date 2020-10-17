import { parseAddFzfArg, parseProcesses, parseResume } from "@/args"
import { parseSession } from "@/args/session-parser"
import { convertForFzf } from "@/connector/convert-for-fzf"
import { setResourceCommandName } from "@/connector/resume"
import { HANDLER_NAME } from "@/const/fzf-handler"
import { generateOptions } from "@/fzf/option/generator"
import { processesDefinition } from "@/fzf/process"
import { executeCommandModule } from "@/module/execute-command"
import { saveStore } from "@/module/persist"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import { sessionModule } from "@/module/session"
import { fzfRunner } from "@/plugin/fzf-runner"
import { syncVimOptions, syncVimVariable } from "@/plugin/sync-vim-variable"
import { dispatch } from "@/store"
import { getCurrentFilePath } from "@/system/file"
import type { FzfCommand, ResourceLines } from "@/type"

const getDefaultProcesses = (defaultProcessesName: string) => {
  const targetProcessesDefinition = processesDefinition.find((define) => define.name === defaultProcessesName)
  if (targetProcessesDefinition == null) {
    throw new Error(`Processes not found: "${defaultProcessesName}"`)
  }

  return targetProcessesDefinition.processes
}

const getDefaultOptions = async (defaultFzfOptionFunc: FzfCommand["defaultFzfOptionFunc"]) => {
  const defaultOptions = defaultFzfOptionFunc()

  // eslint-disable-next-line no-return-await
  return defaultOptions instanceof Promise ? await defaultOptions : defaultOptions
}

const getEnableDevIcons = (resourceLines: ResourceLines, enableDevIconsCommandSetting: boolean) => {
  return (
    enableDevIconsCommandSetting &&
    globalVariableSelector("fzfPreviewUseDevIcons") !== 0 &&
    globalVariableSelector("fzfPreviewDevIconsLimit") > resourceLines.length
  )
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
  await syncVimVariable()
  await syncVimOptions()

  if (beforeCommandHook != null) {
    beforeCommandHook(args)
  }

  const addFzfOptions = parseAddFzfArg(args)
  const userProcesses = parseProcesses(defaultProcessesName, args)
  const fzfCommandDefaultOptions = await getDefaultOptions(defaultFzfOptionFunc)
  const defaultProcesses = getDefaultProcesses(defaultProcessesName)
  const resumeQuery = await parseResume(commandName, args)
  const currentSession = await parseSession(args)

  if (currentSession != null) {
    dispatch(sessionModule.actions.setCurrentSession({ session: currentSession }))
  }

  const sourceFuncArgs = sourceFuncArgsParser(args)
  const resource = await sourceFunc(sourceFuncArgs)
  const dynamicOptions = resource.options
  const enableDevIcons = getEnableDevIcons(resource.lines, enableDevIconsCommandSetting)

  const fzfOptions = await generateOptions({
    fzfCommandDefaultOptions,
    dynamicOptions,
    defaultProcesses,
    userProcesses,
    userOptions: addFzfOptions,
    resumeQuery,
  })

  dispatch(
    executeCommandModule.actions.setExecuteCommand({
      commandName,
      options: {
        userProcesses,
        enableDevIcons,
        currentFilePath: await getCurrentFilePath(),
      },
    })
  )
  await setResourceCommandName(commandName)
  await dispatch(saveStore({ modules: ["executeCommand"] }))

  const resourceForFzf = convertForFzf(resource.lines, {
    enableConvertForFzf,
    enableDevIcons,
  })

  await fzfRunner({
    resourceLines: resourceForFzf,
    handler: HANDLER_NAME,
    options: fzfOptions,
  })
}

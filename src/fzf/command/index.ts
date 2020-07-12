import { parseAddFzfArg, parseProcesses, parseResume } from "@/args"
import { convertForFzf } from "@/connector/convert-for-fzf"
import { setResourceCommandName } from "@/connector/resume"
import { HANDLER_NAME } from "@/const/fzf-handler"
import { generateOptions } from "@/fzf/option/generator"
import { processesDefinition } from "@/fzf/process"
import { executeCommandModule } from "@/module/execute-command"
import { loadCache, saveStore } from "@/module/persist"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import { fzfRunner } from "@/plugin/fzf-runner"
import { syncVimVariable } from "@/plugin/sync-vim-variable"
import { dispatch } from "@/store"
import { currentFilePath } from "@/system/file"
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

const getEnableDevIcons = (source: ResourceLines, enableDevIconsCommandSetting: boolean) => {
  return (
    enableDevIconsCommandSetting &&
    globalVariableSelector("fzfPreviewUseDevIcons") !== 0 &&
    globalVariableSelector("fzfPreviewDevIconsLimit") > source.length
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
    enablePostProcessCommand,
    beforeCommandHook,
  }: FzfCommand
): Promise<void> => {
  await dispatch(loadCache())

  await syncVimVariable()

  if (beforeCommandHook != null) {
    beforeCommandHook(args)
  }

  const addFzfOptions = parseAddFzfArg(args)
  const userProcesses = parseProcesses(defaultProcessesName, args)
  const fzfCommandDefaultOptions = await getDefaultOptions(defaultFzfOptionFunc)
  const defaultProcesses = getDefaultProcesses(defaultProcessesName)
  const resumeQuery = await parseResume(commandName, args)

  const fzfOptions = await generateOptions({
    fzfCommandDefaultOptions,
    defaultProcesses,
    userProcesses,
    userOptions: addFzfOptions,
    resumeQuery,
  })

  const sourceFuncArgs = sourceFuncArgsParser(args)
  const source = await sourceFunc(sourceFuncArgs)
  const enableDevIcons = getEnableDevIcons(source, enableDevIconsCommandSetting)

  dispatch(
    executeCommandModule.actions.setExecuteCommand({
      commandName,
      options: {
        userProcesses,
        enableDevIcons,
        currentFilePath: await currentFilePath(),
      },
    })
  )
  await setResourceCommandName(commandName)
  await dispatch(saveStore({ modules: ["environment", "executeCommand", "cache"] }))

  const sourceForFzf = convertForFzf(source, {
    enableConvertForFzf,
    enableDevIcons,
    enablePostProcessCommand,
  })

  await fzfRunner({
    source: sourceForFzf,
    handler: HANDLER_NAME,
    options: fzfOptions,
  })
}

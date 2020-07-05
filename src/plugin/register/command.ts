import { parseAddFzfArgs, parseEmptySourceFuncArgs, parseProcesses, parseResume } from "@/args"
import { commandDefinition } from "@/association/command"
import { convertForFzf } from "@/connector/convert-for-fzf"
import { setResourceCommandName } from "@/connector/resume"
import { HANDLER_NAME } from "@/const/fzf-handler"
import { generateOptions } from "@/fzf/option/generator"
import { processesDefinition } from "@/fzf/process"
import { executeCommandModule } from "@/module/execute-command"
import { saveStore } from "@/module/persist"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import { pluginRegisterCommand } from "@/plugin"
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

const registerCommand = ({
  commandName,
  sourceFunc,
  sourceFuncArgsParser,
  vimCommandOptions,
  defaultFzfOptionFunc,
  defaultProcessesName,
  enableConvertForFzf,
  enableDevIcons: enableDevIconsCommandSetting,
  enablePostProcessCommand,
  beforeCommandHook,
}: FzfCommand) => {
  pluginRegisterCommand(
    commandName,
    async (param: Array<string>) => {
      const args = param[0] != null ? param[0] : ""

      await syncVimVariable()

      if (beforeCommandHook != null) {
        beforeCommandHook(args)
      }

      const addFzfOptions = parseAddFzfArgs(args)
      const userProcessesName = parseProcesses(defaultProcessesName, args)
      const fzfCommandDefaultOptions = await getDefaultOptions(defaultFzfOptionFunc)
      const defaultProcesses = getDefaultProcesses(defaultProcessesName)
      const resumeQuery = await parseResume(commandName, args)

      const fzfOptions = await generateOptions({
        fzfCommandDefaultOptions,
        defaultProcesses,
        userProcessesName,
        userOptions: addFzfOptions,
        resumeQuery,
      })

      const sourceFuncArgs = sourceFuncArgsParser ? sourceFuncArgsParser(args) : parseEmptySourceFuncArgs(args)
      const source = await sourceFunc(sourceFuncArgs)
      const enableDevIcons = getEnableDevIcons(source, enableDevIconsCommandSetting)

      dispatch(
        executeCommandModule.actions.setExecuteCommand({
          commandName,
          options: {
            userProcessesName,
            enableDevIcons,
            currentFilePath: await currentFilePath(),
          },
        })
      )
      await setResourceCommandName(commandName)
      await dispatch(saveStore({ modules: ["executeCommand"] }))

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
    },
    vimCommandOptions
  )
}

export const registerCommands = (): void => {
  commandDefinition.forEach((command) => {
    registerCommand(command)
  })
}

import { parseAddFzfArgs, parseEmptySourceFuncArgs, parseProcesses, parseResume } from "@/args"
import { commandDefinition } from "@/association/command"
import { setResourceCommandName } from "@/connector/resume"
import { handlerName } from "@/const/fzf-handler"
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
import type { FzfCommand } from "@/type"

const registerCommand = ({
  commandName,
  sourceFunc,
  sourceFuncArgsParser,
  vimCommandOptions,
  defaultFzfOptionFunc,
  defaultProcessesName,
  enableDevIcons,
  beforeCommandHook
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
      const processesName = parseProcesses(args)
      const resumeQuery = await parseResume(commandName, args)

      const defaultOptions = defaultFzfOptionFunc()
      const targetProcessesDefinition = processesDefinition.find((define) => define.name === defaultProcessesName)
      if (targetProcessesDefinition == null) {
        throw new Error(`Processes not found: "${defaultProcessesName}"`)
      }
      const defaultProcesses = targetProcessesDefinition.processes
      const fzfOptions = await generateOptions({
        fzfCommandDefaultOptions: defaultOptions instanceof Promise ? await defaultOptions : defaultOptions,
        defaultProcesses,
        userProcessesName: processesName,
        userOptions: addFzfOptions,
        resumeQuery
      })
      const sourceFuncArgs = sourceFuncArgsParser ? sourceFuncArgsParser(args) : parseEmptySourceFuncArgs(args)

      dispatch(
        executeCommandModule.actions.setExecuteCommand({
          commandName,
          options: {
            processesName,
            enableDevIcons: enableDevIcons && globalVariableSelector("fzfPreviewUseDevIcons"),
            currentFilePath: await currentFilePath()
          }
        })
      )
      await setResourceCommandName(commandName)
      await dispatch(saveStore())

      await fzfRunner({
        source: await sourceFunc(sourceFuncArgs),
        handler: handlerName,
        options: fzfOptions
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

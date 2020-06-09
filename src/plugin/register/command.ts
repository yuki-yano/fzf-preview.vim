import { parseAddFzfArgs, parseEmptySourceFuncArgs, parseProcessors } from "@/args"
import { commandDefinition } from "@/association/command"
import { handlerName } from "@/const/fzf-handler"
import { generateOptions } from "@/fzf/option/generator"
import { executeCommandModule } from "@/module/execute-command"
import { saveStore } from "@/module/persist"
import { createGlobalVariableSelector } from "@/module/vim-variable"
import { pluginRegisterCommand } from "@/plugin"
import { fzfRunner } from "@/plugin/fzf-runner"
import { syncVimVariable } from "@/plugin/sync-vim-variable"
import { dispatch, store } from "@/store"
import type { FzfCommand } from "@/type"

const registerCommand = ({
  commandName,
  sourceFunc,
  sourceFuncArgsParser,
  vimCommandOptions,
  defaultFzfOptionFunc,
  defaultProcessors,
  enableDevIcons,
  optionalUnnecessaryPrefixLength
}: FzfCommand) => {
  pluginRegisterCommand(
    commandName,
    async ([args]: Array<string>) => {
      await syncVimVariable()

      const addFzfOptions = parseAddFzfArgs(args)
      const processorsName = parseProcessors(args)
      const fzfOptions = await generateOptions({
        fzfCommandDefaultOptions: defaultFzfOptionFunc(),
        defaultProcessors,
        userProcessorsName: processorsName,
        userOptions: addFzfOptions
      })
      const sourceFuncArgs = sourceFuncArgsParser ? sourceFuncArgsParser(args) : parseEmptySourceFuncArgs(args)

      const globalVariableSelector = createGlobalVariableSelector(store)
      dispatch(
        executeCommandModule.actions.setExecuteCommand({
          commandName,
          options: {
            processorsName,
            enableDevIcons: enableDevIcons && globalVariableSelector("fzfPreviewUseDevIcons"),
            optionalUnnecessaryPrefixLength
          }
        })
      )
      await dispatch(saveStore())

      fzfRunner({
        source: await sourceFunc(sourceFuncArgs),
        handler: handlerName,
        options: fzfOptions
      })
    },
    vimCommandOptions
  )
}

export const registerCommands = () => {
  commandDefinition.forEach((command) => {
    registerCommand(command)
  })
}

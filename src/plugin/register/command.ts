import { pluginRegisterCommand } from "@/plugin"
import { commandDefinition } from "@/association/command"
import type { FzfCommand } from "@/type"
import { syncVimVariable } from "@/plugin/sync-vim-variable"
import { generateOptions } from "@/fzf/option/generator"
import { fzfRunner } from "@/plugin/fzf-runner"
import { parseAddFzfArgs, parseProcessors } from "@/args"
import { dispatch } from "@/store"
import { persistModule } from "@/module/persist"
import { executeCommandModule } from "@/module/execute-command"

const registerCommand = ({
  commandName,
  sourceFunc,
  handlerName,
  vimCommandOptions,
  defaultFzfOptionFunc,
  defaultProcessors
}: FzfCommand) => {
  pluginRegisterCommand(
    commandName,
    async ([args]: Array<string>) => {
      dispatch(executeCommandModule.actions.setExecuteCommand({ commandName }))
      await syncVimVariable()

      const addFzfOptions = parseAddFzfArgs(args)
      const processorsName = parseProcessors(args)
      const fzfOptions = await generateOptions({
        fzfCommandDefaultOptions: defaultFzfOptionFunc(),
        defaultProcessors,
        userProcessorsName: processorsName,
        userOptions: addFzfOptions
      })
      fzfRunner({
        source: sourceFunc(),
        handler: handlerName,
        options: fzfOptions
      })

      dispatch(persistModule.actions.persistStore())
    },
    vimCommandOptions
  )
}

export const registerCommands = () => {
  commandDefinition.forEach((command) => {
    registerCommand(command)
  })
}

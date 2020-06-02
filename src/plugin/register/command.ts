import { pluginRegisterCommand } from "@/plugin"
import { commandDefinition } from "@/association/command"
import type { FzfCommand } from "@/type"
import { syncVimVariable } from "@/plugin/sync-vim-variable"
import { generateOptions } from "@/fzf/option/generator"
import { fzfRunner } from "@/plugin/fzf-runner"
import { parseAddFzfArgs } from "@/args"

const registerCommand = ({
  commandName,
  sourceFunc,
  handlerName,
  vimCommandOptions,
  defaultFzfOptionFunc: defaultOptionFunc
}: FzfCommand) => {
  pluginRegisterCommand(
    commandName,
    async ([args]: Array<string>) => {
      await syncVimVariable()

      const addFzfOptions = parseAddFzfArgs(args)
      const fzfOptions = generateOptions(defaultOptionFunc(), addFzfOptions)
      fzfRunner({
        source: sourceFunc(),
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

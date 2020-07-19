import { fzfOptionsToString } from "@/fzf/option/convert"
import { devIconsHighlightCommands } from "@/fzf/syntax/dev-icons"
import { executeCommandSelector } from "@/module/selector/execute-command"
import { pluginCall, pluginCommand } from "@/plugin"
import type { FzfOptions, ResourceLines } from "@/type"

type Parameter = {
  source: ResourceLines
  handler: string
  options: FzfOptions
  syntaxCommands?: Array<string>
}

export const fzfRunner = async ({ source, handler, options, syntaxCommands }: Parameter): Promise<void> => {
  await pluginCall("fzf_preview#remote#runner#fzf_run", {
    source,
    handler,
    options: fzfOptionsToString(options),
    environment: PLUGIN.ENV,
  })

  if (syntaxCommands != null) {
    syntaxCommands.forEach(async (command) => {
      await pluginCommand(command)
    })
  }

  if (executeCommandSelector().options.enableDevIcons) {
    devIconsHighlightCommands().forEach(async (command) => {
      await pluginCommand(command)
    })
  }
}

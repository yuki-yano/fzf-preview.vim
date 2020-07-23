import { fzfOptionsToString } from "@/fzf/option/convert"
import { devIconsHighlightCommands } from "@/fzf/syntax/dev-icons"
import { executeCommandSelector } from "@/module/selector/execute-command"
import { pluginCall, pluginCommand } from "@/plugin"
import type { FzfOptions, ResourceLine, ResourceLines } from "@/type"

type Parameter = {
  resourceLines: ResourceLines
  handler: string
  options: FzfOptions
  syntaxCommands?: Array<string>
}

const resourceLineToFzfLine = (resourceLine: ResourceLine): string => {
  return `   ${encodeURIComponent(JSON.stringify(resourceLine.data))} ${resourceLine.displayText}`
}

export const fzfRunner = async ({ resourceLines, handler, options, syntaxCommands }: Parameter): Promise<void> => {
  await pluginCall("fzf_preview#remote#runner#fzf_run", {
    source: resourceLines.map((line) => resourceLineToFzfLine(line)),
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

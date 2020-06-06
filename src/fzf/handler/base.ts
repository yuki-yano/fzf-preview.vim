import { createConnect, dispatch } from "@/store"
import { createExecuteCommandSelector } from "@/module/execute-command"
import { persistModule } from "@/module/persist"
import { createProcessorsFunctionName } from "@/fzf/processor"
import { pluginCall } from "@/plugin"

export const baseHandler = (lines: Array<string>) => {
  const connect = createConnect(
    createExecuteCommandSelector,
    ({ commandName, options }) => {
      const expectKey = lines.shift()

      if (commandName && expectKey !== undefined) {
        pluginCall("fzf_preview#remote#handler_to_processor#receive_from_remote_plugin", [
          createProcessorsFunctionName(commandName, expectKey),
          expectKey,
          lines,
          options.processorsName
        ])
      }
    },
    { once: true }
  )
  connect()

  dispatch(persistModule.actions.restoreStore())
}

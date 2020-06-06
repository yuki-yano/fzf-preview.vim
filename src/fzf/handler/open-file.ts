import { createConnect, dispatch } from "@/store"
import { createExecuteCommandSelector } from "@/module/execute-command"
import { persistModule } from "@/module/persist"
import { createProcessorsFunctionName } from "@/fzf/processor"
import { processorRunner } from "@/plugin/processor-runner"

export const openFileHandler = (lines: Array<string>) => {
  const connect = createConnect(
    createExecuteCommandSelector,
    ({ commandName, options }) => {
      const expectKey = lines.shift()

      if (commandName && expectKey !== undefined) {
        processorRunner({
          processorsFunctionName: createProcessorsFunctionName(commandName, expectKey),
          expectKey,
          lines,
          options
        })
      }
    },
    { once: true }
  )
  connect()

  dispatch(persistModule.actions.restoreStore())
}

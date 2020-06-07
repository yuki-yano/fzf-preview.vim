import { createConnect, store, dispatch } from "@/store"
import { persistModule } from "@/module/persist"
import { createExecuteCommandSelector } from "@/module/execute-command"
import { createGlobalVariableSelector } from "@/module/vim-variable"
import { createProcessorsFunctionName } from "@/fzf/processor"
import { processorRunner } from "@/plugin/processor-runner"

type ProcessArgs = ReturnType<ReturnType<typeof createExecuteCommandSelector>>

export const trimLines = (lines: Array<string>, _optionalSize?: number) => {
  const vimVariableSelector = createGlobalVariableSelector(store)
  const isUseDevIcons = vimVariableSelector("fzfPreviewUseDevIcons")
  const devIconPrefixLength = vimVariableSelector("fzfPreviewDevIconPrefixStringLength")

  if (isUseDevIcons && typeof devIconPrefixLength === "number") {
    return lines.map((line) => line.slice(devIconPrefixLength))
  } else {
    return lines
  }
}

const runProcessor = (lines: Array<string>) => ({ commandName, options: commandOptions }: ProcessArgs) => {
  const expectKey = lines.shift()
  if (commandName && expectKey !== undefined) {
    processorRunner({
      processorsFunctionName: createProcessorsFunctionName(commandName, expectKey),
      expectKey,
      lines: trimLines(lines),
      options: commandOptions
    })
  }
}

export const openFileHandler = (lines: Array<string>) => {
  const connect = createConnect(createExecuteCommandSelector, runProcessor(lines), { once: true })
  connect()

  dispatch(persistModule.actions.restoreStore())
}

import { createConnect, store, dispatch } from "@/store"
import { persistModule } from "@/module/persist"
import { createExecuteCommandSelector, State as ExecuteCommandState } from "@/module/execute-command"
import { createGlobalVariableSelector } from "@/module/vim-variable"
import { createProcessorsFunctionName } from "@/fzf/processor"
import { processorRunner } from "@/plugin/processor-runner"

export const trimLines = (lines: Array<string>, optionalSize = 0) => {
  const isEnableDevIcons = createExecuteCommandSelector(store)().options.enableDevIcons
  if (!isEnableDevIcons) {
    return lines
  }

  const devIconPrefixLength = createGlobalVariableSelector(store)("fzfPreviewDevIconPrefixStringLength")
  if (typeof devIconPrefixLength !== "number") {
    throw new Error("g:fzf_preview_dev_icon_prefix_string_length must be number")
  }
  return lines.map((line) => line.slice(devIconPrefixLength + optionalSize))
}

const runProcessor = (lines: Array<string>) => ({ commandName, options: commandOptions }: ExecuteCommandState) => {
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

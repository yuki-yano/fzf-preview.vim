import { VimValue } from "neovim/lib/types/VimValue"

import { store, dispatch } from "@/store"
import { loadStore } from "@/module/persist"
import { createExecuteCommandSelector, State as ExecuteCommandState } from "@/module/execute-command"
import { createGlobalVariableSelector } from "@/module/vim-variable"
import { createProcessorsFunctionName } from "@/fzf/processor"
import { processorRunner } from "@/plugin/processor-runner"

export const trimLines = (lines: Array<string>, enableDevIcons: VimValue, optionalUnnecessaryPrefixLength = 0) => {
  const globalVariableSelector = createGlobalVariableSelector(store)
  const devIconPrefixLength = globalVariableSelector("fzfPreviewDevIconPrefixStringLength")
  if (typeof devIconPrefixLength !== "number") {
    throw new Error("g:fzf_preview_dev_icon_prefix_string_length must be number")
  }

  const unnecessaryPrefixLength = (enableDevIcons ? devIconPrefixLength : 0) + optionalUnnecessaryPrefixLength
  return lines.map((line) => line.slice(unnecessaryPrefixLength))
}

const runProcessor = (
  lines: Array<string>,
  { commandName, options: { processorsName, enableDevIcons, optionalUnnecessaryPrefixLength } }: ExecuteCommandState
) => {
  const expectKey = lines.shift()
  if (commandName && expectKey !== undefined) {
    processorRunner({
      processorsFunctionName: createProcessorsFunctionName(commandName, expectKey),
      expectKey,
      lines: trimLines(lines, enableDevIcons, optionalUnnecessaryPrefixLength),
      processorsName
    })
  }
}

export const callProcessor = async (lines: Array<string>) => {
  await dispatch(loadStore())
  const executeCommand = createExecuteCommandSelector(store)()
  runProcessor(lines, executeCommand)
}

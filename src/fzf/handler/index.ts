import { VimValue } from "neovim/lib/types/VimValue"

import { createProcessesFunctionName } from "@/fzf/process"
import { createExecuteCommandSelector, State as ExecuteCommandState } from "@/module/execute-command"
import { loadStore } from "@/module/persist"
import { createGlobalVariableSelector } from "@/module/vim-variable"
import { processesRunner } from "@/plugin/process-runner"
import { dispatch, store } from "@/store"

export const trimLines = (lines: Array<string>, enableDevIcons: VimValue, optionalUnnecessaryPrefixLength = 0) => {
  const globalVariableSelector = createGlobalVariableSelector(store)
  const devIconPrefixLength = globalVariableSelector("fzfPreviewDevIconPrefixStringLength")
  if (typeof devIconPrefixLength !== "number") {
    throw new Error("g:fzf_preview_dev_icon_prefix_string_length must be number")
  }

  const unnecessaryPrefixLength = (enableDevIcons ? devIconPrefixLength : 0) + optionalUnnecessaryPrefixLength
  return lines.map((line) => line.slice(unnecessaryPrefixLength))
}

const runProcess = (
  lines: Array<string>,
  { commandName, options: { processesName, enableDevIcons, optionalUnnecessaryPrefixLength } }: ExecuteCommandState
) => {
  const expectKey = lines.shift()
  if (commandName && expectKey !== undefined) {
    processesRunner({
      processesFunctionName: createProcessesFunctionName(commandName, expectKey),
      expectKey,
      lines: trimLines(lines, enableDevIcons, optionalUnnecessaryPrefixLength),
      processesName
    })
  }
}

export const callProcess = async (lines: Array<string>) => {
  await dispatch(loadStore())
  const executeCommand = createExecuteCommandSelector(store)()
  runProcess(lines, executeCommand)
}

import { VimValue } from "neovim/lib/types/VimValue"

import { commandDefinition } from "@/association/command"
import { createProcessesFunctionName } from "@/fzf/process"
import { createExecuteCommandSelector, State as ExecuteCommandState } from "@/module/execute-command"
import { loadStore } from "@/module/persist"
import { createGlobalVariableSelector } from "@/module/vim-variable"
import { processesRunner } from "@/plugin/process-runner"
import { dispatch, store } from "@/store"
import type { ExpectKeyAndSelectedLines, FzfCommand, SelectedLines } from "@/type"

export const dropDevIcon = (lines: Array<string>, enableDevIcons: VimValue) => {
  const globalVariableSelector = createGlobalVariableSelector(store)
  const devIconPrefixLength = globalVariableSelector("fzfPreviewDevIconPrefixStringLength")
  if (typeof devIconPrefixLength !== "number") {
    throw new Error("g:fzf_preview_dev_icon_prefix_string_length must be number")
  }

  return lines.map((line) => line.slice(enableDevIcons ? devIconPrefixLength : 0))
}

const runProcess = (
  lines: ExpectKeyAndSelectedLines,
  { commandName, options: { processesName, enableDevIcons } }: ExecuteCommandState
) => {
  const expectKey = lines[0]
  const selectedLines = lines.slice(1) as SelectedLines

  const { convertLine } = commandDefinition.find((command) => command.commandName === commandName) as FzfCommand
  const convertedLines = dropDevIcon(selectedLines, enableDevIcons).map(convertLine)

  if (commandName && expectKey !== undefined) {
    processesRunner({
      processesFunctionName: createProcessesFunctionName(commandName, expectKey),
      expectKey,
      lines: convertedLines,
      processesName
    })
  }
}

export const callProcess = async (lines: Array<string>) => {
  await dispatch(loadStore())
  const executeCommand = createExecuteCommandSelector(store)()
  runProcess(lines, executeCommand)
}

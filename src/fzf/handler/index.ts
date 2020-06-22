import { VimValue } from "neovim/lib/types/VimValue"

import { commandDefinition } from "@/association/command"
import { createProcessesFunctionName } from "@/fzf/process"
import { State as ExecuteCommandState } from "@/module/execute-command"
import { loadStore } from "@/module/persist"
import { executeCommandSelector } from "@/module/selector/execute-command"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import { processesRunner } from "@/plugin/process-runner"
import { dispatch } from "@/store"
import type { ConvertedLines, ExpectKeyAndSelectedLines, FzfCommand, SelectedLines } from "@/type"

const dropDevIcon = (lines: SelectedLines, enableDevIcons: VimValue) => {
  const devIconPrefixLength = globalVariableSelector("fzfPreviewDevIconPrefixStringLength")
  if (typeof devIconPrefixLength !== "number") {
    throw new Error("g:fzf_preview_dev_icon_prefix_string_length must be number")
  }

  return lines.map((line) => line.slice(enableDevIcons ? devIconPrefixLength : 0))
}

const runProcess = async (
  lines: ExpectKeyAndSelectedLines,
  { commandName, options: { processesName, enableDevIcons } }: ExecuteCommandState
) => {
  const expectKey = lines[0]
  const selectedLines = lines.slice(1) as SelectedLines

  const { convertLine } = commandDefinition.find((command) => command.commandName === commandName) as FzfCommand
  const convertedLines = dropDevIcon(selectedLines, enableDevIcons).map(convertLine)

  if (commandName && expectKey != null) {
    await processesRunner({
      processesFunctionName: createProcessesFunctionName(commandName, expectKey),
      expectKey,
      lines: convertedLines,
      processesName
    })
  }
}

export const callProcess = async (lines: ConvertedLines): Promise<void> => {
  await dispatch(loadStore())
  const executeCommand = executeCommandSelector()
  await runProcess(lines, executeCommand)
}

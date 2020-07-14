import { VimValue } from "neovim/lib/types/VimValue"

import { createProcessFunctionName } from "@/fzf/util"
import { State as ExecuteCommandState } from "@/module/execute-command"
import { loadExecuteCommandStore } from "@/module/persist"
import { executeCommandSelector } from "@/module/selector/execute-command"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import { processesRunner } from "@/plugin/process-runner"
import { syncVimVariable } from "@/plugin/sync-vim-variable"
import { dispatch } from "@/store"
import type { ConvertedLines, ExpectKeyAndSelectedLines, FzfCommand, SelectedLines } from "@/type"

/* eslint-disable */
const commands: Array<FzfCommand> =
  PLUGIN.ENV === "remote"
    ? (require("@/association/command").commandDefinition as Array<FzfCommand>)
    : PLUGIN.ENV === "coc"
    ? (require("@/association/coc-command").cocCommandDefinition as Array<FzfCommand>)
    : []
/* eslint-enable */

const dropDevIcon = (lines: SelectedLines, enableDevIcons: VimValue) => {
  const devIconPrefixLength = globalVariableSelector("fzfPreviewDevIconPrefixStringLength")
  if (typeof devIconPrefixLength !== "number") {
    throw new Error("g:fzf_preview_dev_icon_prefix_string_length must be number")
  }

  return lines.map((line) => line.slice(enableDevIcons ? devIconPrefixLength : 0))
}

const runProcess = async (
  lines: ExpectKeyAndSelectedLines,
  { commandName, options: { userProcesses, enableDevIcons } }: ExecuteCommandState
) => {
  const expectKey = lines[0] === "" ? "enter" : lines[0]
  const selectedLines = lines.slice(1) as SelectedLines

  const { defaultProcessesName, convertLine } = commands.find(
    (command) => command.commandName === commandName
  ) as FzfCommand
  const convertedLines = dropDevIcon(selectedLines, enableDevIcons).map(convertLine)

  if (commandName != null) {
    await processesRunner({
      processesFunctionName: createProcessFunctionName(defaultProcessesName, expectKey),
      expectKey,
      lines: convertedLines,
      userProcesses,
    })
  }
}

export const callProcess = async ([lines]: [ConvertedLines, ...Array<unknown>]): Promise<void> => {
  await syncVimVariable()
  await dispatch(loadExecuteCommandStore())
  const executeCommand = executeCommandSelector()
  await runProcess(lines, executeCommand)
}

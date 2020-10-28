import { createProcessFunctionName } from "@/fzf/util"
import type { State as ExecuteCommandState } from "@/module/execute-command"
import { loadExecuteCommandStore } from "@/module/persist"
import { executeCommandSelector } from "@/module/selector/execute-command"
import { processesRunner } from "@/plugin/process-runner"
import { syncVimVariable } from "@/plugin/sync-vim-variable"
import { dispatch } from "@/store"
import type { CallbackLines, ExpectKeyAndSelectedLines, FzfCommand, SelectedLines } from "@/type"

/* eslint-disable */
const commands: Array<FzfCommand> =
  PLUGIN.ENV === "remote"
    ? (require("@/association/command").commandDefinition as Array<FzfCommand>)
    : PLUGIN.ENV === "coc"
    ? (require("@/association/coc-command").cocCommandDefinition as Array<FzfCommand>)
    : []
/* eslint-enable */

const runProcess = async (
  lines: ExpectKeyAndSelectedLines,
  { commandName, options: { userProcesses } }: ExecuteCommandState
) => {
  const expectKey = lines[0] === "" ? "enter" : lines[0]
  const selectedLines = lines.slice(1) as SelectedLines

  const { defaultProcessesName } = commands.find((command) => command.commandName === commandName) as FzfCommand
  // const convertedLines = dropDevIcon(selectedLines, enableDevIcons).map(convertLine)

  if (commandName != null) {
    await processesRunner({
      processesFunctionName: createProcessFunctionName(defaultProcessesName, expectKey),
      expectKey,
      lines: selectedLines,
      userProcesses,
    })
  }
}

export const callProcess = async ([lines]: [CallbackLines, ...Array<unknown>]): Promise<void> => {
  await syncVimVariable()
  await dispatch(loadExecuteCommandStore())
  const executeCommand = executeCommandSelector()
  await runProcess(lines, executeCommand)
}

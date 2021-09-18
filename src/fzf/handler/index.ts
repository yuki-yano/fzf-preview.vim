import { createProcessFunctionName } from "@/fzf/util"
import type { State as ExecuteCommandState } from "@/module/execute-command"
import { executeCommandSelector } from "@/module/selector/execute-command"
import { processesRunner } from "@/plugin/process-runner"
import { syncVimVariable } from "@/plugin/sync-vim-variable"
import type { CallbackLines, ExpectKeyAndSelectedLines, FzfCommand, SelectedLines } from "@/type"

/* eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-var-requires,global-require,node/no-missing-require */
const commands: ReadonlyArray<FzfCommand> =
  // eslint-disable-next-line no-nested-ternary
  PLUGIN.ENV === "remote" || PLUGIN.ENV === "rpc"
    ? (require("@/association/command").commandDefinition as ReadonlyArray<FzfCommand>)
    : PLUGIN.ENV === "coc"
    ? (require("@/association/coc-command").cocCommandDefinition as ReadonlyArray<FzfCommand>)
    : []
/* eslint-enable */

const runProcess = async (
  lines: ExpectKeyAndSelectedLines,
  { commandName, options: { userProcesses } }: ExecuteCommandState
) => {
  const expectKey = lines[0] === "" ? "enter" : lines[0]
  const selectedLines = lines.slice(1) as SelectedLines

  const { defaultProcessesName } = commands.find((command) => command.commandName === commandName) as FzfCommand

  if (commandName != null) {
    await processesRunner({
      processesFunctionName: createProcessFunctionName(defaultProcessesName, expectKey),
      expectKey,
      lines: selectedLines,
      userProcesses,
    })
  }
}

export const callProcess = async ([lines]: [CallbackLines, ...ReadonlyArray<unknown>]): Promise<void> => {
  await syncVimVariable()
  const executeCommand = executeCommandSelector()
  await runProcess(lines, executeCommand)
}

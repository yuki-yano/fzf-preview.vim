import { decodeLine } from "@/fzf/process/consumer"
import { gitActionProcesses } from "@/fzf/process/git-action"
import { gitBranchProcesses } from "@/fzf/process/git-branch"
import { gitBranchActionProcesses } from "@/fzf/process/git-branch-action"
import { gitLogProcesses } from "@/fzf/process/git-log"
import { gitLogActionProcesses } from "@/fzf/process/git-log-action"
import { gitStatusProcesses } from "@/fzf/process/git-status"
import { gitStatusActionProcesses } from "@/fzf/process/git-status-action"
import { openBufferProcesses } from "@/fzf/process/open-buffer"
import { openBufnrProcesses } from "@/fzf/process/open-bufnr"
import { openFileProcesses } from "@/fzf/process/open-file"
import { openPrProcesses } from "@/fzf/process/open-pr"
import { registerProcesses } from "@/fzf/process/register"
import { loadExecuteCommandStore } from "@/module/persist"
import { syncVimVariable } from "@/plugin/sync-vim-variable"
import { dispatch } from "@/store"
import type { CallbackLines, Process, ProcessesDefinition } from "@/type"

export const processesDefinition: ProcessesDefinition = [
  {
    name: "open-file",
    processes: openFileProcesses,
  },
  {
    name: "open-buffer",
    processes: openBufferProcesses,
  },
  {
    name: "open-bufnr",
    processes: openBufnrProcesses,
  },
  {
    name: "git-action",
    processes: gitActionProcesses,
  },
  {
    name: "git-status",
    processes: gitStatusProcesses,
  },
  {
    name: "git-status-actions",
    processes: gitStatusActionProcesses,
  },
  {
    name: "git-branch",
    processes: gitBranchProcesses,
  },
  {
    name: "git-branch-actions",
    processes: gitBranchActionProcesses,
  },
  {
    name: "git-log",
    processes: gitLogProcesses,
  },
  {
    name: "git-log-actions",
    processes: gitLogActionProcesses,
  },
  {
    name: "register",
    processes: registerProcesses,
  },
  {
    name: "open-pr",
    processes: openPrProcesses,
  },
]

export const executeProcess = async (lines: CallbackLines, process: Process): Promise<void> => {
  await syncVimVariable()
  await dispatch(loadExecuteCommandStore())
  await process.execute(lines.map((line) => decodeLine(line)))
}

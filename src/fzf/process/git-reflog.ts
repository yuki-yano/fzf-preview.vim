import { chainGitActionsConsumer, chainGitStatusConsumer } from "@/fzf/process/consumer/git"
import { gitShowConsumer } from "@/fzf/process/consumer/git-log"
import { chainGitReflogActionsConsumer } from "@/fzf/process/consumer/git-reflog"
import { createProcess } from "@/fzf/process/process"
import type { Processes } from "@/type"

const createGitReflogProcess = createProcess("git-reflog")

export const gitReflogProcesses: Processes = [
  createGitReflogProcess("enter", gitShowConsumer),
  createGitReflogProcess("ctrl-s", chainGitStatusConsumer),
  createGitReflogProcess("<", chainGitActionsConsumer),
  createGitReflogProcess(">", chainGitReflogActionsConsumer),
]

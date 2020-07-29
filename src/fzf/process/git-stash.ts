import { chainGitActionsConsumer, chainGitStatusConsumer } from "@/fzf/process/consumer/git"
import { chainGitStashActionsConsumer, gitStashDefaultConsumer } from "@/fzf/process/consumer/git-stash"
import { createProcess } from "@/fzf/process/process"
import type { Processes } from "@/type"

const createGitStashProcess = createProcess("git-stash")

export const gitStashProcesses: Processes = [
  createGitStashProcess("enter", gitStashDefaultConsumer),
  createGitStashProcess("ctrl-s", chainGitStatusConsumer),
  createGitStashProcess("<", chainGitActionsConsumer),
  createGitStashProcess(">", chainGitStashActionsConsumer),
]

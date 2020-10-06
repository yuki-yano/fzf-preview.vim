import { chainGitActionsConsumer, chainGitStatusConsumer } from "@/fzf/process/consumer/git"
import { chainGitStashActionsConsumer, gitStashDefaultConsumer } from "@/fzf/process/consumer/git-stash"
import { createProcessCreator } from "@/fzf/process/process"
import type { Processes } from "@/type"

const createGitStashProcess = createProcessCreator("git-stash")

export const gitStashProcesses: Processes = [
  createGitStashProcess("enter", gitStashDefaultConsumer),
  createGitStashProcess("ctrl-s", chainGitStatusConsumer),
  createGitStashProcess("<", chainGitActionsConsumer),
  createGitStashProcess(">", chainGitStashActionsConsumer),
]

import { chainGitStatusConsumer } from "@/fzf/process/consumer/git"
import { execGitStatusActionConsumer } from "@/fzf/process/consumer/git-status-action"
import { createProcessCreator } from "@/fzf/process/process"
import type { Processes } from "@/type"

const createGitStatusActionProcess = createProcessCreator("git-status-actions")

export const gitStatusActionProcesses: Processes = [
  createGitStatusActionProcess("enter", execGitStatusActionConsumer),
  createGitStatusActionProcess("<", chainGitStatusConsumer),
]

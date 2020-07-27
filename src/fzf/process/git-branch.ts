import { chainGitActionsConsumer, chainGitStatusConsumer, gitCheckoutConsumer } from "@/fzf/process/consumer/git"
import { chainGitBranchActionsConsumer } from "@/fzf/process/consumer/git-branch"
import { createProcess } from "@/fzf/process/process"
import type { Processes } from "@/type"

const createGitBranchProcess = createProcess("git-branch")

export const gitBranchProcesses: Processes = [
  createGitBranchProcess("enter", gitCheckoutConsumer),
  createGitBranchProcess("ctrl-s", chainGitStatusConsumer),
  createGitBranchProcess("<", chainGitActionsConsumer),
  createGitBranchProcess(">", chainGitBranchActionsConsumer),
]

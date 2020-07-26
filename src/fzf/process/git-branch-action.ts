import { chainGitBranchesConsumer } from "@/fzf/process/consumer/git"
import { execGitBranchActionConsumer } from "@/fzf/process/consumer/git-branch-action"
import { createProcess } from "@/fzf/process/process"
import type { Processes } from "@/type"

const createGitBranchActionProcess = createProcess("git-branch-actions")

export const gitBranchActionProcesses: Processes = [
  createGitBranchActionProcess("enter", execGitBranchActionConsumer),
  createGitBranchActionProcess("ctrl-q", chainGitBranchesConsumer),
]

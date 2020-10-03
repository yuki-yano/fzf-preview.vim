import { chainGitBranchesConsumer } from "@/fzf/process/consumer/git"
import { execGitBranchActionConsumer } from "@/fzf/process/consumer/git-branch-action"
import { createProcessCreator } from "@/fzf/process/process"
import type { Processes } from "@/type"

const createGitBranchActionProcess = createProcessCreator("git-branch-actions")

export const gitBranchActionProcesses: Processes = [
  createGitBranchActionProcess("enter", execGitBranchActionConsumer),
  createGitBranchActionProcess("<", chainGitBranchesConsumer),
]

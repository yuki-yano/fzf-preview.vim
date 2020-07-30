import { chainGitReflogsConsumer } from "@/fzf/process/consumer/git"
import { execGitReflogActionConsumer } from "@/fzf/process/consumer/git-reflog-action"
import { createProcess } from "@/fzf/process/process"
import type { Processes } from "@/type"

const createGitReflogActionProcess = createProcess("git-reflog-actions")

export const gitReflogActionProcesses: Processes = [
  createGitReflogActionProcess("enter", execGitReflogActionConsumer),
  createGitReflogActionProcess("<", chainGitReflogsConsumer),
]

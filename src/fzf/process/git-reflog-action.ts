import { chainGitReflogsConsumer } from "@/fzf/process/consumer/git"
import { execGitReflogActionConsumer } from "@/fzf/process/consumer/git-reflog-action"
import { createProcessCreator } from "@/fzf/process/process"
import type { Processes } from "@/type"

const createGitReflogActionProcess = createProcessCreator("git-reflog-actions")

export const gitReflogActionProcesses: Processes = [
  createGitReflogActionProcess("enter", execGitReflogActionConsumer),
  createGitReflogActionProcess("<", chainGitReflogsConsumer),
]

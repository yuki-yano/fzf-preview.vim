import { chainGitLogsConsumer } from "@/fzf/process/consumer/git"
import { execGitLogActionConsumer } from "@/fzf/process/consumer/git-log-action"
import { createProcessCreator } from "@/fzf/process/process"
import type { Processes } from "@/type"

const createGitLogActionProcess = createProcessCreator("git-log-actions")

export const gitLogActionProcesses: Processes = [
  createGitLogActionProcess("enter", execGitLogActionConsumer),
  createGitLogActionProcess("<", chainGitLogsConsumer),
]

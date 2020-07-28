import { chainGitLogsConsumer } from "@/fzf/process/consumer/git"
import { execGitLogActionConsumer } from "@/fzf/process/consumer/git-log-action"
import { createProcess } from "@/fzf/process/process"
import type { Processes } from "@/type"

const createGitLogActionProcess = createProcess("git-log-actions")

export const gitLogActionProcesses: Processes = [
  createGitLogActionProcess("enter", execGitLogActionConsumer),
  createGitLogActionProcess("<", chainGitLogsConsumer),
]

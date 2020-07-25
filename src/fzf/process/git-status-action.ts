import { execGitStatusActionConsumer } from "@/fzf/process/consumer/git-status-action"
import { createProcess } from "@/fzf/process/process"
import type { Processes } from "@/type"

const createGitStatusActionProcess = createProcess("git-status-actions")

export const gitStatusActionProcesses: Processes = [createGitStatusActionProcess("enter", execGitStatusActionConsumer)]

import { execGitActionConsumer } from "@/fzf/process/consumer/git-action"
import { createProcess } from "@/fzf/process/process"
import type { Processes } from "@/type"

const createGitActionProcess = createProcess("git-action")

export const gitActionProcesses: Processes = [createGitActionProcess("enter", execGitActionConsumer)]

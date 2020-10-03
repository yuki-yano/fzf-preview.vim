import { execGitActionConsumer } from "@/fzf/process/consumer/git-action"
import { createProcessCreator } from "@/fzf/process/process"
import type { Processes } from "@/type"

const createGitActionProcess = createProcessCreator("git-action")

export const gitActionProcesses: Processes = [createGitActionProcess("enter", execGitActionConsumer)]

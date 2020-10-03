import { chainGitActionsConsumer, chainGitStatusConsumer } from "@/fzf/process/consumer/git"
import { chainGitLogActionsConsumer, gitShowConsumer } from "@/fzf/process/consumer/git-log"
import { createProcessCreator } from "@/fzf/process/process"
import type { Processes } from "@/type"

const createGitLogProcess = createProcessCreator("git-log")

export const gitLogProcesses: Processes = [
  createGitLogProcess("enter", gitShowConsumer),
  createGitLogProcess("ctrl-s", chainGitStatusConsumer),
  createGitLogProcess("<", chainGitActionsConsumer),
  createGitLogProcess(">", chainGitLogActionsConsumer),
]

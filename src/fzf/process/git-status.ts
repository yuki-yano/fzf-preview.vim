import { chainGitActionsConsumer } from "@/fzf/process/consumer/git"
import {
  chainGitStatusActionsConsumer,
  gitAddConsumer,
  gitCommitConsumer,
  gitResetConsumer,
} from "@/fzf/process/consumer/git-status"
import {
  dropConsumer,
  editConsumer,
  splitConsumer,
  tabeditConsumer,
  vsplitConsumer,
} from "@/fzf/process/consumer/open-file"
import { createProcessCreator } from "@/fzf/process/process"
import type { Processes } from "@/type"

const createGitStatusProcess = createProcessCreator("git-status")

export const gitStatusProcesses: Processes = [
  createGitStatusProcess("enter", editConsumer),
  createGitStatusProcess("ctrl-x", splitConsumer),
  createGitStatusProcess("ctrl-v", vsplitConsumer),
  createGitStatusProcess("ctrl-t", tabeditConsumer),
  createGitStatusProcess("ctrl-o", dropConsumer),
  createGitStatusProcess("ctrl-a", gitAddConsumer),
  createGitStatusProcess("ctrl-r", gitResetConsumer),
  createGitStatusProcess("ctrl-c", gitCommitConsumer),
  createGitStatusProcess("<", chainGitActionsConsumer),
  createGitStatusProcess(">", chainGitStatusActionsConsumer),
]

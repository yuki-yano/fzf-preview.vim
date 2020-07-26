import { chainGitActionsConsumer } from "@/fzf/process/consumer/git"
import { chainGitStatusActionsConsumer, gitAddConsumer, gitResetConsumer } from "@/fzf/process/consumer/git-status"
import {
  dropConsumer,
  editConsumer,
  splitConsumer,
  tabeditConsumer,
  vsplitConsumer,
} from "@/fzf/process/consumer/open-file"
import { createProcess } from "@/fzf/process/process"
import type { Processes } from "@/type"

const createGitStatusProcess = createProcess("git-status")

export const gitStatusProcesses: Processes = [
  createGitStatusProcess("enter", editConsumer),
  createGitStatusProcess("ctrl-x", splitConsumer),
  createGitStatusProcess("ctrl-v", vsplitConsumer),
  createGitStatusProcess("ctrl-t", tabeditConsumer),
  createGitStatusProcess("ctrl-o", dropConsumer),
  createGitStatusProcess("ctrl-q", chainGitActionsConsumer),
  createGitStatusProcess("ctrl-a", gitAddConsumer),
  createGitStatusProcess("ctrl-r", gitResetConsumer),
  createGitStatusProcess("ctrl-c", chainGitStatusActionsConsumer),
]

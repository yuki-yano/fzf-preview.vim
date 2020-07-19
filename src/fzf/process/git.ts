import { gitAddConsumer, gitPatchConsumer, gitResetConsumer } from "@/fzf/process/consumer/git"
import {
  dropConsumer,
  editConsumer,
  exportQuickfixConsumer,
  splitConsumer,
  tabeditConsumer,
  vsplitConsumer,
} from "@/fzf/process/consumer/open-file"
import { createProcess } from "@/fzf/process/process"
import type { Processes } from "@/type"

const createGitProcess = createProcess("git")

export const gitProcesses: Processes = [
  createGitProcess("enter", editConsumer),
  createGitProcess("ctrl-x", splitConsumer),
  createGitProcess("ctrl-v", vsplitConsumer),
  createGitProcess("ctrl-t", tabeditConsumer),
  createGitProcess("ctrl-o", dropConsumer),
  createGitProcess("ctrl-q", exportQuickfixConsumer),
  createGitProcess("ctrl-a", gitAddConsumer),
  createGitProcess("ctrl-r", gitResetConsumer),
  createGitProcess("ctrl-c", gitPatchConsumer),
]

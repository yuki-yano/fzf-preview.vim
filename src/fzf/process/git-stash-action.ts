import { chainGitStashesConsumer } from "@/fzf/process/consumer/git"
import { execGitStashActionConsumer } from "@/fzf/process/consumer/git-stash-action"
import { createProcessCreator } from "@/fzf/process/process"
import type { Processes } from "@/type"

const createGitStashActionProcess = createProcessCreator("git-stash-actions")

export const gitStashActionProcesses: Processes = [
  createGitStashActionProcess("enter", execGitStashActionConsumer),
  createGitStashActionProcess("<", chainGitStashesConsumer),
]

import { store } from "@/store"
import { isGitDirectory } from "@/system/project"
import { createGlobalVariableSelector } from "@/module/vim-variable"
import { execCommand } from "@/system/command"

export const gitFiles = () => {
  if (!isGitDirectory()) {
    throw new Error("The current directory is not a git project")
  }

  const vimVariableSelector = createGlobalVariableSelector(store)
  const gitFilesCommand = vimVariableSelector("fzfPreviewGitStatusCommand")

  if (typeof gitFilesCommand !== "string") {
    return new Promise<Array<string>>((resolve) => resolve([]))
  }

  const { stdout, stderr, status } = execCommand(gitFilesCommand)

  if (stderr !== "" || status !== 0) {
    throw new Error(`Failed to get the file list. command: "${gitFilesCommand}"`)
  }

  return new Promise<Array<string>>((resolve) => resolve(stdout.split("\n")))
}

export const gitFilesDefaultOptions = () => ({
  "--prompt": '"GitStatus> "',
  "--multi": true,
  "--preview": `"${createGlobalVariableSelector(store)("fzfPreviewGitStatusPreviewCommand")}"`
})

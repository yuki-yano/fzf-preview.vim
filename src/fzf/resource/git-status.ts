import { createConvertDropPrefix } from "@/fzf/converter/drop-prefix-converter"
import { createGlobalVariableSelector } from "@/module/vim-variable"
import { store } from "@/store"
import { execCommand } from "@/system/command"
import { isGitDirectory } from "@/system/project"
import type { SourceFuncArgs } from "@/type"

// eslint-disable-next-line @typescript-eslint/require-await
export const gitStatus = async (_args: SourceFuncArgs) => {
  if (!isGitDirectory()) {
    throw new Error("The current directory is not a git project")
  }

  const globalVariableSelector = createGlobalVariableSelector(store)
  const gitStatusCommand = globalVariableSelector("fzfPreviewGitStatusCommand")

  if (typeof gitStatusCommand !== "string") {
    return []
  }

  const { stdout, stderr, status } = execCommand(gitStatusCommand)

  if (stderr !== "" || status !== 0) {
    throw new Error(`Failed to get the file list. command: "${gitStatusCommand}"`)
  }

  return stdout.split("\n")
}

export const dropGitStatusPrefix = createConvertDropPrefix(3)

export const gitStatusDefaultOptions = () => ({
  "--prompt": '"GitStatus> "',
  "--multi": true,
  "--preview": `"${createGlobalVariableSelector(store)("fzfPreviewGitStatusPreviewCommand")}"`
})

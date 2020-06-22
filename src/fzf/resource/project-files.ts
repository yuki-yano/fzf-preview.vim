import { executeCommandSelector } from "@/module/selector/execute-command"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import { convertForFzf } from "@/plugin/connector/convert-for-fzf"
import { execCommand } from "@/system/command"
import { isGitDirectory } from "@/system/project"
import type { SourceFuncArgs } from "@/type"

export const projectFiles = async (_args: SourceFuncArgs) => {
  if (!isGitDirectory()) {
    throw new Error("The current directory is not a git project")
  }

  const filelistCommand = globalVariableSelector("fzfPreviewFilelistCommand")

  if (typeof filelistCommand !== "string") {
    return []
  }

  const { stdout, stderr, status } = execCommand(filelistCommand)

  if (stderr !== "" || status !== 0) {
    throw new Error(`Failed to get the file list. command: "${filelistCommand}"`)
  }

  const files = stdout.split("\n").filter((file) => file !== "")

  const { enableDevIcons } = executeCommandSelector().options
  if (enableDevIcons) {
    const convertedFiles = await convertForFzf(files)
    return convertedFiles
  } else {
    return files
  }
}

export const projectFilesDefaultOptions = () => ({
  "--prompt": '"ProjectFiles> "',
  "--multi": true,
  "--preview": `"${globalVariableSelector("fzfPreviewCommand")}"`
})

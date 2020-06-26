import { convertForFzf } from "@/connector/convert-for-fzf"
import { executeCommandSelector } from "@/module/selector/execute-command"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import { execCommand } from "@/system/command"
import { isGitDirectory } from "@/system/project"
import type { FzfCommandDefinitionDefaultOption, ResourceLines, SourceFuncArgs } from "@/type"

export const gitFiles = async (_args: SourceFuncArgs): Promise<ResourceLines> => {
  if (!isGitDirectory()) {
    throw new Error("The current directory is not a git project")
  }

  const gitFilesCommand = globalVariableSelector("fzfPreviewGitFilesCommand")

  if (typeof gitFilesCommand !== "string") {
    return []
  }

  const { stdout, stderr, status } = execCommand(gitFilesCommand)

  if (stderr !== "" || status !== 0) {
    throw new Error(`Failed to get the file list. command: "${gitFilesCommand}"`)
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

export const gitFilesDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"GitFiles> "',
  "--multi": true,
  "--preview": `"${globalVariableSelector("fzfPreviewCommand") as string}"`
})

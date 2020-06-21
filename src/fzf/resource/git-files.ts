import { executeCommandSelector } from "@/module/selector/execute-command"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import { pluginCall } from "@/plugin"
import { execCommand } from "@/system/command"
import { isGitDirectory } from "@/system/project"
import type { ResourceLines, SourceFuncArgs } from "@/type"

export const gitFiles = async (_args: SourceFuncArgs) => {
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
    return (await pluginCall("fzf_preview#remote#converter#convert_for_fzf", [files])) as Promise<ResourceLines>
  } else {
    return files
  }
}

export const gitFilesDefaultOptions = () => ({
  "--prompt": '"GitFiles> "',
  "--multi": true,
  "--preview": `"${globalVariableSelector("fzfPreviewCommand")}"`
})

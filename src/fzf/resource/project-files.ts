import { filePreviewCommand } from "@/fzf/util"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import { execCommand } from "@/system/command"
import { isGitDirectory } from "@/system/project"
import type { FzfCommandDefinitionDefaultOption, ResourceLines, SourceFuncArgs } from "@/type"

// eslint-disable-next-line @typescript-eslint/require-await
export const projectFiles = async (_args: SourceFuncArgs): Promise<ResourceLines> => {
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

  return stdout.split("\n").filter((file) => file !== "")
}

export const projectFilesDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"ProjectFiles> "',
  "--multi": true,
  "--preview": filePreviewCommand(),
})

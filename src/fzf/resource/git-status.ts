import { createConvertDropPrefix } from "@/fzf/converter/drop-prefix-converter"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import { execCommand } from "@/system/command"
import { isGitDirectory } from "@/system/project"
import type { FzfCommandDefinitionDefaultOption, ResourceLines, SourceFuncArgs } from "@/type"

// eslint-disable-next-line @typescript-eslint/require-await
export const gitStatus = async (_args: SourceFuncArgs): Promise<ResourceLines> => {
  if (!isGitDirectory()) {
    throw new Error("The current directory is not a git project")
  }

  const gitStatusCommand = globalVariableSelector("fzfPreviewGitStatusCommand")

  if (typeof gitStatusCommand !== "string") {
    return []
  }

  const { stdout, stderr, status } = execCommand(gitStatusCommand)

  if (stderr !== "" || status !== 0) {
    throw new Error(`Failed to get the file list. command: "${gitStatusCommand}"`)
  }

  return stdout.split("\n").filter((line) => line !== "")
}

export const dropGitStatusPrefix = createConvertDropPrefix(3)

export const gitStatusDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"GitStatus> "',
  "--multi": true,
  "--preview": `'${globalVariableSelector("fzfPreviewGitStatusPreviewCommand") as string}'`,
})

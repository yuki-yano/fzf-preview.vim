import { execGitStatus } from "@/connector/git"
import { isGitDirectory } from "@/connector/util"
import { createConvertDropPrefix } from "@/fzf/converter/drop-prefix-converter"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import type { FzfCommandDefinitionDefaultOption, Resource, SourceFuncArgs } from "@/type"

export const gitStatus = async (_args: SourceFuncArgs): Promise<Resource> => {
  if (!(await isGitDirectory())) {
    throw new Error("The current directory is not a git project")
  }

  const lines = await execGitStatus()
  return { lines }
}

export const dropGitStatusPrefix = createConvertDropPrefix(3)

export const gitStatusDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"GitStatus> "',
  "--multi": true,
  "--preview": `'${globalVariableSelector("fzfPreviewGitStatusPreviewCommand") as string}'`,
})

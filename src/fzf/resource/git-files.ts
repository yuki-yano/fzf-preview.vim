import { execGitFiles } from "@/connector/git"
import { isGitDirectory } from "@/connector/util"
import { filePreviewCommand } from "@/fzf/util"
import type { FzfCommandDefinitionDefaultOption, Resource, SourceFuncArgs } from "@/type"

export const gitFiles = async (_args: SourceFuncArgs): Promise<Resource> => {
  if (!(await isGitDirectory())) {
    throw new Error("The current directory is not a git project")
  }

  const lines = await execGitFiles()
  return { lines: lines.filter((file) => file !== "" && !file.includes(" ")) }
}

export const gitFilesDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"GitFiles> "',
  "--multi": true,
  "--preview": filePreviewCommand(),
})

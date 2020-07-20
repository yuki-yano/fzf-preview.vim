import { execProjectFiles } from "@/connector/project-files"
import { isGitDirectory } from "@/connector/util"
import { filePreviewCommand } from "@/fzf/util"
import type { FzfCommandDefinitionDefaultOption, Resource, SourceFuncArgs } from "@/type"

export const projectFiles = async (_args: SourceFuncArgs): Promise<Resource> => {
  if (!(await isGitDirectory())) {
    throw new Error("The current directory is not a git project")
  }

  const lines = await execProjectFiles()
  return { lines: lines.filter((file) => file !== "" && !file.includes(" ")) }
}

export const projectFilesDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"ProjectFiles> "',
  "--multi": true,
  "--preview": filePreviewCommand(),
})

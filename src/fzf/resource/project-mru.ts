import { isGitDirectory } from "@/connector/util"
import { filePreviewCommand } from "@/fzf/util"
import { currentFilePath } from "@/system/file"
import { readMruFile } from "@/system/mr"
import { filterProjectEnabledFile } from "@/system/project"
import type { FzfCommandDefinitionDefaultOption, Resource, SourceFuncArgs } from "@/type"

export const projectMruFiles = async (_args: SourceFuncArgs): Promise<Resource> => {
  const currentFile = await currentFilePath()

  if (!(await isGitDirectory())) {
    throw new Error("The current directory is not a git project")
  }

  const mruFiles = readMruFile()
  return { lines: (await filterProjectEnabledFile(mruFiles)).filter((file) => file !== currentFile) }
}

export const projectMruFilesDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"ProjectMruFiles> "',
  "--multi": true,
  "--preview": filePreviewCommand(),
})

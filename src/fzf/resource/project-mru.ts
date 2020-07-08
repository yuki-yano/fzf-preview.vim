import { filePreviewCommand } from "@/fzf/util"
import { currentFilePath } from "@/system/file"
import { readMruFile } from "@/system/mr"
import { filterProjectEnabledFile, isGitDirectory } from "@/system/project"
import type { FzfCommandDefinitionDefaultOption, ResourceLines, SourceFuncArgs } from "@/type"

export const projectMruFiles = async (_args: SourceFuncArgs): Promise<ResourceLines> => {
  if (!isGitDirectory()) {
    throw new Error("The current directory is not a git project")
  }

  const currentFile = await currentFilePath()
  return filterProjectEnabledFile(await readMruFile()).filter((file) => file !== currentFile)
}

export const projectMruFilesDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"ProjectMruFiles> "',
  "--multi": true,
  "--preview": filePreviewCommand(),
})

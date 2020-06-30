import { filePreviewCommand } from "@/fzf/util"
import { readMrwFile } from "@/system/mr"
import { filterProjectEnabledFile, isGitDirectory } from "@/system/project"
import type { FzfCommandDefinitionDefaultOption, ResourceLines, SourceFuncArgs } from "@/type"

export const projectMrwFiles = async (_args: SourceFuncArgs): Promise<ResourceLines> => {
  if (!isGitDirectory()) {
    throw new Error("The current directory is not a git project")
  }

  return filterProjectEnabledFile(await readMrwFile())
}

export const projectMrwFilesDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"ProjectMrwFiles> "',
  "--multi": true,
  "--preview": filePreviewCommand(),
})

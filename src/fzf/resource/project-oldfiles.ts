import { getOldFiles } from "@/connector/old-files"
import { filePreviewCommand } from "@/fzf/util"
import { filterProjectEnabledFile, isGitDirectory } from "@/system/project"
import type { FzfCommandDefinitionDefaultOption, ResourceLines, SourceFuncArgs } from "@/type"

export const projectOldFiles = async (_args: SourceFuncArgs): Promise<ResourceLines> => {
  if (!isGitDirectory()) {
    throw new Error("The current directory is not a git project")
  }

  return filterProjectEnabledFile(await getOldFiles())
}

export const projectOldFilesDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"ProjectOldFiles> "',
  "--multi": true,
  "--preview": filePreviewCommand(),
})

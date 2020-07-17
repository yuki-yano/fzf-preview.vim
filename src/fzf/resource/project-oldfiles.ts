import { getOldFiles } from "@/connector/old-files"
import { isGitDirectory } from "@/connector/util"
import { filePreviewCommand } from "@/fzf/util"
import { filterProjectEnabledFile } from "@/system/project"
import type { FzfCommandDefinitionDefaultOption, Resource, SourceFuncArgs } from "@/type"

export const projectOldFiles = async (_args: SourceFuncArgs): Promise<Resource> => {
  if (!(await isGitDirectory())) {
    throw new Error("The current directory is not a git project")
  }

  return { lines: filterProjectEnabledFile(await getOldFiles()) }
}

export const projectOldFilesDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"ProjectOldFiles> "',
  "--multi": true,
  "--preview": filePreviewCommand(),
})

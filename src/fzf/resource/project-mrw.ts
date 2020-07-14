import { filePreviewCommand } from "@/fzf/util"
import { cacheSelector } from "@/module/selector/cache"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import { currentFilePath, existsFile } from "@/system/file"
import { readMrwFile } from "@/system/mr"
import { filterProjectEnabledFile, isGitDirectory } from "@/system/project"
import type { FzfCommandDefinitionDefaultOption, ResourceLines, SourceFuncArgs } from "@/type"

export const projectMrwFiles = async (_args: SourceFuncArgs): Promise<ResourceLines> => {
  const currentFile = await currentFilePath()

  if (globalVariableSelector("fzfPreviewUseLookAheadMrCache") !== 0) {
    if (cacheSelector().projectRoot === "") {
      throw new Error("The current directory is not a git project")
    }

    return cacheSelector().projectMrwFiles.filter((file) => file !== currentFile)
  }

  if (!isGitDirectory) {
    throw new Error("The current directory is not a git project")
  }

  const mrwFiles = readMrwFile().filter((file) => existsFile(file))
  return filterProjectEnabledFile(mrwFiles).filter((file) => file !== currentFile)
}

export const projectMrwFilesDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"ProjectMrwFiles> "',
  "--multi": true,
  "--preview": filePreviewCommand(),
})

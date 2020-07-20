import { isGitDirectory } from "@/connector/util"
import { filePreviewCommand } from "@/fzf/util"
import { cacheSelector } from "@/module/selector/cache"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import { currentFilePath } from "@/system/file"
import { readMrwFile } from "@/system/mr"
import { filterProjectEnabledFile } from "@/system/project"
import type { FzfCommandDefinitionDefaultOption, Resource, SourceFuncArgs } from "@/type"

export const projectMrwFiles = async (_args: SourceFuncArgs): Promise<Resource> => {
  const currentFile = await currentFilePath()

  if (globalVariableSelector("fzfPreviewUseLookAheadMrCache") !== 0) {
    if (cacheSelector().projectRoot === "") {
      throw new Error("The current directory is not a git project")
    }

    return { lines: cacheSelector().projectMrwFiles.filter((file) => file !== currentFile) }
  }

  if (!(await isGitDirectory())) {
    throw new Error("The current directory is not a git project")
  }

  const mrwFiles = readMrwFile()
  return { lines: (await filterProjectEnabledFile(mrwFiles)).filter((file) => file !== currentFile) }
}

export const projectMrwFilesDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"ProjectMrwFiles> "',
  "--multi": true,
  "--preview": filePreviewCommand(),
})

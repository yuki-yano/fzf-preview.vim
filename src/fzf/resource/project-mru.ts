import { isGitDirectory } from "@/connector/util"
import { filePreviewCommand } from "@/fzf/util"
import { cacheSelector } from "@/module/selector/cache"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import { currentFilePath } from "@/system/file"
import { readMruFile } from "@/system/mr"
import { filterProjectEnabledFile } from "@/system/project"
import type { FzfCommandDefinitionDefaultOption, Resource, SourceFuncArgs } from "@/type"

export const projectMruFiles = async (_args: SourceFuncArgs): Promise<Resource> => {
  const currentFile = await currentFilePath()

  if (globalVariableSelector("fzfPreviewUseLookAheadMrCache") !== 0) {
    if (cacheSelector().projectRoot === "") {
      throw new Error("The current directory is not a git project")
    }

    return { lines: cacheSelector().projectMruFiles.filter((file) => file !== currentFile) }
  }

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

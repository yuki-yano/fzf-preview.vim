import { filePreviewCommand } from "@/fzf/util"
import { cacheSelector } from "@/module/selector/cache"
import { currentFilePath } from "@/system/file"
import type { FzfCommandDefinitionDefaultOption, ResourceLines, SourceFuncArgs } from "@/type"

export const projectMruFiles = async (_args: SourceFuncArgs): Promise<ResourceLines> => {
  if (cacheSelector().projectRoot === "") {
    throw new Error("The current directory is not a git project")
  }

  const currentFile = await currentFilePath()
  return cacheSelector().projectMruFiles.filter((file) => file !== currentFile)
}

export const projectMruFilesDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"ProjectMruFiles> "',
  "--multi": true,
  "--preview": filePreviewCommand(),
})

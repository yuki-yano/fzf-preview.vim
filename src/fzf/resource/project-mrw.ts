import { filePreviewCommand } from "@/fzf/util"
import { cacheSelector } from "@/module/selector/cache"
import { currentFilePath } from "@/system/file"
import type { FzfCommandDefinitionDefaultOption, ResourceLines, SourceFuncArgs } from "@/type"

export const projectMrwFiles = async (_args: SourceFuncArgs): Promise<ResourceLines> => {
  if (cacheSelector().projectRoot === "") {
    throw new Error("The current directory is not a git project")
  }

  const currentFile = await currentFilePath()
  return cacheSelector().projectMrwFiles.filter((file) => file !== currentFile)
}

export const projectMrwFilesDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"ProjectMrwFiles> "',
  "--multi": true,
  "--preview": filePreviewCommand(),
})

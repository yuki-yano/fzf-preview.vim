import { getOldFiles } from "@/connector/old-files"
import { filePreviewCommand } from "@/fzf/util"
import { existsFileAsync } from "@/system/file"
import type { FzfCommandDefinitionDefaultOption, Resource, SourceFuncArgs } from "@/type"
import { asyncFilter } from "@/util/array"

export const oldFiles = async (_args: SourceFuncArgs): Promise<Resource> => {
  const files = await getOldFiles()

  return {
    lines: await asyncFilter(files, (file) => existsFileAsync(file)),
  }
}

export const oldFilesDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"OldFiles> "',
  "--multi": true,
  "--preview": filePreviewCommand(),
})

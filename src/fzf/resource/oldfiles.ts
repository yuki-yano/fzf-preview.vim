import { getOldFiles } from "@/connector/old-files"
import { colorizeFile } from "@/fzf/syntax/colorize"
import { filePreviewCommand } from "@/fzf/util"
import { existsFileAsync } from "@/system/file"
import type { FzfCommandDefinitionDefaultOption, Resource, ResourceLines, SourceFuncArgs } from "@/type"
import { asyncFilter } from "@/util/array"

export const oldFiles = async (_args: SourceFuncArgs): Promise<Resource> => {
  const files = await getOldFiles()
  const existsFiles = await asyncFilter(files, (file) => existsFileAsync(file))

  const resourceLines: ResourceLines = existsFiles.map((file) => ({
    data: {
      command: "FzfPreviewOldFiles",
      type: "file",
      file,
    },
    displayText: colorizeFile(file),
  }))

  return {
    type: "json",
    lines: resourceLines,
  }
}

export const oldFilesDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"OldFiles> "',
  "--multi": true,
  "--preview": filePreviewCommand(),
  "--keep-right": true,
})

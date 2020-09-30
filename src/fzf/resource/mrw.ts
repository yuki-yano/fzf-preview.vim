import { colorizeFile } from "@/fzf/syntax/colorize"
import { filePreviewCommand } from "@/fzf/util"
import { existsFileAsync } from "@/system/file"
import { readMrwFile } from "@/system/mr"
import type { FzfCommandDefinitionDefaultOption, Resource, ResourceLines, SourceFuncArgs } from "@/type"
import { asyncFilter } from "@/util/array"

// eslint-disable-next-line @typescript-eslint/require-await
export const mrwFiles = async (_args: SourceFuncArgs): Promise<Resource> => {
  const files = readMrwFile()
  const existsFiles = await asyncFilter(files, (file) => existsFileAsync(file))

  const resourceLines: ResourceLines = existsFiles.map((file) => ({
    data: {
      command: "FzfPreviewMrwFiles",
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

export const mrwFilesDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"MrwFiles> "',
  "--multi": true,
  "--preview": filePreviewCommand(),
  "--keep-right": true,
})

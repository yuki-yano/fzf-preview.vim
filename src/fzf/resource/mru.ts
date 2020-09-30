import { colorizeFile } from "@/fzf/syntax/colorize"
import { filePreviewCommand } from "@/fzf/util"
import { existsFileAsync } from "@/system/file"
import { readMruFile } from "@/system/mr"
import type { FzfCommandDefinitionDefaultOption, Resource, ResourceLines, SourceFuncArgs } from "@/type"
import { asyncFilter } from "@/util/array"

// eslint-disable-next-line @typescript-eslint/require-await
export const mruFiles = async (_args: SourceFuncArgs): Promise<Resource> => {
  const files = readMruFile()
  const existsFiles = await asyncFilter(files, (file) => existsFileAsync(file))

  const resourceLines: ResourceLines = existsFiles.map((file) => ({
    data: {
      command: "FzfPreviewMruFiles",
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

export const mruFilesDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"MruFiles> "',
  "--multi": true,
  "--preview": filePreviewCommand(),
  "--keep-right": true,
})

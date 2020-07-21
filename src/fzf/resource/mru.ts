import { filePreviewCommand } from "@/fzf/util"
import { readMruFile } from "@/system/mr"
import type { FzfCommandDefinitionDefaultOption, Resource, SourceFuncArgs } from "@/type"

// eslint-disable-next-line @typescript-eslint/require-await
export const mruFiles = async (_args: SourceFuncArgs): Promise<Resource> => {
  return { lines: readMruFile() }
}

export const mruFilesDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"MruFiles> "',
  "--multi": true,
  "--preview": filePreviewCommand(),
})

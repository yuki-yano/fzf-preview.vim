import { filePreviewCommand } from "@/fzf/util"
import { readMrwFile } from "@/system/mr"
import type { FzfCommandDefinitionDefaultOption, Resource, SourceFuncArgs } from "@/type"

// eslint-disable-next-line @typescript-eslint/require-await
export const mrwFiles = async (_args: SourceFuncArgs): Promise<Resource> => {
  return { lines: readMrwFile() }
}

export const mrwFilesDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"MrwFiles> "',
  "--multi": true,
  "--preview": filePreviewCommand(),
})

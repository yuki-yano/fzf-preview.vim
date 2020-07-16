import { filePreviewCommand } from "@/fzf/util"
import { cacheSelector } from "@/module/selector/cache"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import { readMrwFile } from "@/system/mr"
import type { FzfCommandDefinitionDefaultOption, Resource, SourceFuncArgs } from "@/type"

// eslint-disable-next-line @typescript-eslint/require-await
export const mrwFiles = async (_args: SourceFuncArgs): Promise<Resource> => {
  if (globalVariableSelector("fzfPreviewUseLookAheadMrCache") !== 0) {
    return { lines: cacheSelector().mrwFiles }
  }

  return { lines: readMrwFile() }
}

export const mrwFilesDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"MrwFiles> "',
  "--multi": true,
  "--preview": filePreviewCommand(),
})

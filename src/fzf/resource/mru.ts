import { filePreviewCommand } from "@/fzf/util"
import { cacheSelector } from "@/module/selector/cache"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import { readMruFile } from "@/system/mr"
import type { FzfCommandDefinitionDefaultOption, Resource, SourceFuncArgs } from "@/type"

// eslint-disable-next-line @typescript-eslint/require-await
export const mruFiles = async (_args: SourceFuncArgs): Promise<Resource> => {
  if (globalVariableSelector("fzfPreviewUseLookAheadMrCache") !== 0) {
    return { lines: cacheSelector().mruFiles }
  }

  return { lines: readMruFile() }
}

export const mruFilesDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"MruFiles> "',
  "--multi": true,
  "--preview": filePreviewCommand(),
})

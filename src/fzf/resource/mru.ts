import { filePreviewCommand } from "@/fzf/util"
import { cacheSelector } from "@/module/selector/cache"
import type { FzfCommandDefinitionDefaultOption, ResourceLines, SourceFuncArgs } from "@/type"

// eslint-disable-next-line @typescript-eslint/require-await
export const mruFiles = async (_args: SourceFuncArgs): Promise<ResourceLines> => cacheSelector().mruFiles

export const mruFilesDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"MruFiles> "',
  "--multi": true,
  "--preview": filePreviewCommand(),
})

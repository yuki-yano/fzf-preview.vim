import { filePreviewCommand } from "@/fzf/util"
import { cacheSelector } from "@/module/selector/cache"
import type { FzfCommandDefinitionDefaultOption, ResourceLines, SourceFuncArgs } from "@/type"

// eslint-disable-next-line @typescript-eslint/require-await
export const mrwFiles = async (_args: SourceFuncArgs): Promise<ResourceLines> => cacheSelector().mrwFiles

export const mrwFilesDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"MrwFiles> "',
  "--multi": true,
  "--preview": filePreviewCommand(),
})

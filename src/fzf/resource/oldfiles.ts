import { getOldFiles } from "@/connector/old-files"
import { filePreviewCommand } from "@/fzf/util"
import { existsFile } from "@/system/file"
import type { FzfCommandDefinitionDefaultOption, ResourceLines, SourceFuncArgs } from "@/type"

export const oldFiles = async (_args: SourceFuncArgs): Promise<ResourceLines> =>
  (await getOldFiles()).filter((file) => existsFile(file))

export const oldFilesDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"OldFiles> "',
  "--multi": true,
  "--preview": filePreviewCommand(),
})

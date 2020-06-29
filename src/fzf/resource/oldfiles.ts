import { getOldFiles } from "@/connector/old-files"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import { collapseHome, existsFile } from "@/system/file"
import type { FzfCommandDefinitionDefaultOption, ResourceLines, SourceFuncArgs } from "@/type"

export const oldFiles = async (_args: SourceFuncArgs): Promise<ResourceLines> =>
  (await getOldFiles()).filter((file) => existsFile(file)).map((file) => collapseHome(file))

export const oldFilesDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"OldFiles> "',
  "--multi": true,
  "--preview": `"${globalVariableSelector("fzfPreviewCommand") as string}"`,
})

import { filePreviewCommand } from "@/fzf/util"
import { existsFile } from "@/system/file"
import { readMrwFile } from "@/system/mr"
import type { FzfCommandDefinitionDefaultOption, ResourceLines, SourceFuncArgs } from "@/type"

export const mrwFiles = async (_args: SourceFuncArgs): Promise<ResourceLines> =>
  (await readMrwFile()).filter((file) => existsFile(file))

export const mrwFilesDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"MrwFiles> "',
  "--multi": true,
  "--preview": filePreviewCommand(),
})

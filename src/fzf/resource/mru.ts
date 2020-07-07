import { filePreviewCommand } from "@/fzf/util"
import { existsFile } from "@/system/file"
import { readMruFile } from "@/system/mr"
import type { FzfCommandDefinitionDefaultOption, ResourceLines, SourceFuncArgs } from "@/type"

export const mruFiles = async (_args: SourceFuncArgs): Promise<ResourceLines> =>
  (await readMruFile()).filter((file) => existsFile(file))

export const mruFilesDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"MruFiles> "',
  "--multi": true,
  "--preview": filePreviewCommand(),
})

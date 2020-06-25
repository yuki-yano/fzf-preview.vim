import { executeCommandSelector } from "@/module/selector/execute-command"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import { convertForFzf } from "@/plugin/connector/convert-for-fzf"
import { collapseHome, existsFile } from "@/system/file"
import { readMrwFile } from "@/system/mr"
import type { FzfCommandDefinitionDefaultOption, ResourceLines, SourceFuncArgs } from "@/type"

export const mrwFiles = async (_args: SourceFuncArgs): Promise<ResourceLines> => {
  const files: ResourceLines = (await readMrwFile()).filter((file) => existsFile(file))

  const { enableDevIcons } = executeCommandSelector().options
  if (enableDevIcons) {
    const convertedFiles = await convertForFzf(files)
    return convertedFiles.map((file) => collapseHome(file))
  } else {
    return files.map((file) => collapseHome(file))
  }
}

export const mrwFilesDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"MrwFiles> "',
  "--multi": true,
  "--preview": `"${globalVariableSelector("fzfPreviewCommand") as string}"`
})

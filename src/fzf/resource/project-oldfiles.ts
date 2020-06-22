import { executeCommandSelector } from "@/module/selector/execute-command"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import { convertForFzf } from "@/plugin/connector/convert-for-fzf"
import { getOldFiles } from "@/plugin/connector/old-files"
import { filterProjectEnabledFile, isGitDirectory } from "@/system/project"
import type { SourceFuncArgs } from "@/type"

export const projectOldFiles = async (_args: SourceFuncArgs) => {
  if (!isGitDirectory()) {
    throw new Error("The current directory is not a git project")
  }

  const files = filterProjectEnabledFile(await getOldFiles())

  const { enableDevIcons } = executeCommandSelector().options
  if (enableDevIcons) {
    const convertedFiles = await convertForFzf(files)
    return convertedFiles
  } else {
    return files
  }
}

export const projectOldFilesDefaultOptions = () => ({
  "--prompt": '"ProjectOldFiles> "',
  "--multi": true,
  "--preview": `"${globalVariableSelector("fzfPreviewCommand")}"`
})

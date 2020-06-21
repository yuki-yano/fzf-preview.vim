import { executeCommandSelector } from "@/module/selector/execute-command"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import { convertForFzf } from "@/system/fzf"
import { readMruFile } from "@/system/mr"
import { filterProjectEnabledFile, isGitDirectory } from "@/system/project"
import type { ResourceLines, SourceFuncArgs } from "@/type"

export const projectMruFiles = async (_args: SourceFuncArgs) => {
  if (!isGitDirectory()) {
    throw new Error("The current directory is not a git project")
  }

  const files: ResourceLines = filterProjectEnabledFile(await readMruFile())

  const { enableDevIcons } = executeCommandSelector().options
  if (enableDevIcons) {
    return convertForFzf(files)
  } else {
    return files
  }
}

export const projectMruFilesDefaultOptions = () => ({
  "--prompt": '"ProjectMruFiles> "',
  "--multi": true,
  "--preview": `"${globalVariableSelector("fzfPreviewCommand")}"`
})

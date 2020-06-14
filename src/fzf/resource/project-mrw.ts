import { createExecuteCommandSelector } from "@/module/execute-command"
import { createGlobalVariableSelector } from "@/module/vim-variable"
import { store } from "@/store"
import { convertForFzf } from "@/system/fzf"
import { readMrwFile } from "@/system/mr"
import { filterProjectEnabledFile, isGitDirectory } from "@/system/project"
import type { ResourceLines, SourceFuncArgs } from "@/type"

export const projectMrwFiles = async (_args: SourceFuncArgs) => {
  if (!isGitDirectory()) {
    throw new Error("The current directory is not a git project")
  }

  const files: ResourceLines = filterProjectEnabledFile(await readMrwFile())
  const executeCommandSelector = createExecuteCommandSelector(store)

  const { enableDevIcons } = executeCommandSelector().options
  if (enableDevIcons) {
    return convertForFzf(files)
  } else {
    return files
  }
}

export const projectMrwFilesDefaultOptions = () => ({
  "--prompt": '"ProjectMrwFiles> "',
  "--multi": true,
  "--preview": `"${createGlobalVariableSelector(store)("fzfPreviewCommand")}"`
})

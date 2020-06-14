import { createExecuteCommandSelector } from "@/module/execute-command"
import { createGlobalVariableSelector } from "@/module/vim-variable"
import { pluginGetVvar } from "@/plugin"
import { store } from "@/store"
import { convertForFzf } from "@/system/fzf"
import { filterProjectEnabledFile, isGitDirectory } from "@/system/project"
import type { ResourceLine, ResourceLines, SourceFuncArgs } from "@/type"

export const projectOldFiles = async (_args: SourceFuncArgs) => {
  if (!isGitDirectory()) {
    throw new Error("The current directory is not a git project")
  }

  const files: ResourceLines = filterProjectEnabledFile((await pluginGetVvar("oldfiles")) as Array<ResourceLine>)
  const executeCommandSelector = createExecuteCommandSelector(store)

  const { enableDevIcons } = executeCommandSelector().options
  if (enableDevIcons) {
    return convertForFzf(files)
  } else {
    return files
  }
}

export const projectOldFilesDefaultOptions = () => ({
  "--prompt": '"ProjectOldFiles> "',
  "--multi": true,
  "--preview": `"${createGlobalVariableSelector(store)("fzfPreviewCommand")}"`
})

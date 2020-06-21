import { executeCommandSelector } from "@/module/selector/execute-command"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import { pluginGetVvar } from "@/plugin"
import { convertForFzf } from "@/system/fzf"
import { filterProjectEnabledFile, isGitDirectory } from "@/system/project"
import type { ResourceLine, ResourceLines, SourceFuncArgs } from "@/type"

export const projectOldFiles = async (_args: SourceFuncArgs) => {
  if (!isGitDirectory()) {
    throw new Error("The current directory is not a git project")
  }

  const files: ResourceLines = filterProjectEnabledFile((await pluginGetVvar("oldfiles")) as Array<ResourceLine>)

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
  "--preview": `"${globalVariableSelector("fzfPreviewCommand")}"`
})

import { createExecuteCommandSelector } from "@/module/execute-command"
import { createGlobalVariableSelector } from "@/module/vim-variable"
import { pluginGetVvar } from "@/plugin"
import { store } from "@/store"
import { existsFile } from "@/system/file"
import { convertForFzf } from "@/system/fzf"
import { filePathToProjectFilePath, isGitDirectory } from "@/system/project"
import type { ResourceLine, SourceFuncArgs } from "@/type"

export const projectOldFiles = async (_args: SourceFuncArgs) => {
  if (!isGitDirectory()) {
    throw new Error("The current directory is not a git project")
  }

  const oldFiles = (await pluginGetVvar("oldfiles")) as Array<string>
  const existsFiles = oldFiles.filter((file) => existsFile(file))

  const files = existsFiles
    .map((filePath) => filePathToProjectFilePath(filePath))
    .filter((filePath): filePath is ResourceLine => filePath !== null)

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

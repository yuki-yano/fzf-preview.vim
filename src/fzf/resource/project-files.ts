import { store } from "@/store"
import { execCommand } from "@/system/command"
import { isGitDirectory } from "@/system/project"
import { createGlobalVariableSelector } from "@/module/vim-variable"
import { createExecuteCommandSelector } from "@/module/execute-command"
import { pluginCall } from "@/plugin"

export const projectFiles = async () => {
  if (!isGitDirectory()) {
    throw new Error("The current directory is not a git project")
  }

  const vimVariableSelector = createGlobalVariableSelector(store)
  const executeCommandSelector = createExecuteCommandSelector(store)
  const filelistCommand = vimVariableSelector("fzfPreviewFilelistCommand")

  if (typeof filelistCommand !== "string") {
    return []
  }

  const { stdout, stderr, status } = execCommand(filelistCommand)

  if (stderr !== "" || status !== 0) {
    throw new Error(`Failed to get the file list. command: "${filelistCommand}"`)
  }

  const files = stdout.split("\n").filter((file) => file !== "")

  const { enableDevIcons } = executeCommandSelector().options
  if (enableDevIcons) {
    return (await pluginCall("fzf_preview#remote#converter#convert_for_fzf", [files])) as Promise<Array<string>>
  } else {
    return new Promise<Array<string>>((resolve) => {
      resolve(files)
    })
  }
}

export const projectFilesDefaultOptions = () => ({
  "--prompt": '"ProjectFiles> "',
  "--multi": true,
  "--preview": `"${createGlobalVariableSelector(store)("fzfPreviewCommand")}"`
})

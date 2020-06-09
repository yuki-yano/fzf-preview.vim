import { store } from "@/store"
import { execCommand } from "@/system/command"
import { createGlobalVariableSelector } from "@/module/vim-variable"
import { createExecuteCommandSelector } from "@/module/execute-command"
import { pluginCall } from "@/plugin"
import type { SourceFuncArgs } from "@/type"

export const directoryFiles = async ({ args: [arg] }: SourceFuncArgs) => {
  const vimVariableSelector = createGlobalVariableSelector(store)
  const executeCommandSelector = createExecuteCommandSelector(store)
  const filelistCommand = vimVariableSelector("fzfPreviewDirectoryFilesCommand")

  if (typeof filelistCommand !== "string") {
    return []
  }

  const { stdout, stderr, status } = execCommand(`${filelistCommand} ${arg || ""}`)

  if (stderr !== "" || status !== 0) {
    throw new Error(`Failed to get the file list. command: "${filelistCommand} ${arg || ""}"`)
  }

  const files = stdout.split("\n").filter((file) => file !== "")

  const { enableDevIcons } = executeCommandSelector().options
  if (enableDevIcons) {
    return (await pluginCall("fzf_preview#remote#converter#convert_for_fzf", [files])) as Promise<Array<string>>
  } else {
    return files
  }
}

export const directoryFilesDefaultOptions = () => ({
  "--prompt": '"DirectoryFiles> "',
  "--multi": true,
  "--preview": `"${createGlobalVariableSelector(store)("fzfPreviewCommand")}"`
})

import { executeCommandSelector } from "@/module/selector/execute-command"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import { convertForFzf } from "@/plugin/connector/convert-for-fzf"
import { execCommand } from "@/system/command"
import type { SourceFuncArgs } from "@/type"

export const directoryFiles = async ({ args: [arg] }: SourceFuncArgs) => {
  const filelistCommand = globalVariableSelector("fzfPreviewDirectoryFilesCommand")

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
    const convertedFiles = await convertForFzf(files)
    return convertedFiles
  } else {
    return files
  }
}

export const directoryFilesDefaultOptions = () => ({
  "--prompt": '"DirectoryFiles> "',
  "--multi": true,
  "--preview": `"${globalVariableSelector("fzfPreviewCommand")}"`
})

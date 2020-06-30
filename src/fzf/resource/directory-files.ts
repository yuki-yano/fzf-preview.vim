import { filePreviewCommand } from "@/fzf/util"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import { execCommand } from "@/system/command"
import type { FzfCommandDefinitionDefaultOption, ResourceLines, SourceFuncArgs } from "@/type"

// eslint-disable-next-line @typescript-eslint/require-await
export const directoryFiles = async ({ args: [arg] }: SourceFuncArgs): Promise<ResourceLines> => {
  const filelistCommand = globalVariableSelector("fzfPreviewDirectoryFilesCommand")

  if (typeof filelistCommand !== "string") {
    return []
  }

  const { stdout, stderr, status } = execCommand(`${filelistCommand} ${arg || ""}`)

  if (stderr !== "" || status !== 0) {
    throw new Error(`Failed to get the file list. command: "${filelistCommand} ${arg || ""}"`)
  }

  return stdout.split("\n").filter((file) => file !== "")
}

export const directoryFilesDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"DirectoryFiles> "',
  "--multi": true,
  "--preview": filePreviewCommand(),
})

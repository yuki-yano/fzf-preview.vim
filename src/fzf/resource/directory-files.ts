import { filePreviewCommand } from "@/fzf/util"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import { execSyncCommand } from "@/system/command"
import type { FzfCommandDefinitionDefaultOption, FzfCommandDynamicOption, Resource, SourceFuncArgs } from "@/type"

// eslint-disable-next-line @typescript-eslint/require-await
export const directoryFiles = async ({ args: [arg] }: SourceFuncArgs): Promise<Resource> => {
  const filelistCommand = globalVariableSelector("fzfPreviewDirectoryFilesCommand")

  if (typeof filelistCommand !== "string") {
    return { lines: [] }
  }

  const { stdout, stderr, status } = execSyncCommand(`${filelistCommand} ${arg || ""}`)

  if (stderr !== "" || status !== 0) {
    throw new Error(`Failed to get the file list. command: "${filelistCommand} ${arg || ""}"`)
  }

  const options: FzfCommandDynamicOption | undefined = arg ? { "--header": `Directory: ${arg}` } : undefined

  return {
    lines: stdout.split("\n").filter((file) => file !== ""),
    options,
  }
}

export const directoryFilesDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"DirectoryFiles> "',
  "--multi": true,
  "--preview": filePreviewCommand(),
})

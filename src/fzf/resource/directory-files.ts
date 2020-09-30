import { execDirectoryFiles } from "@/connector/directory-files"
import { colorizeFile } from "@/fzf/syntax/colorize"
import { filePreviewCommand } from "@/fzf/util"
import type { FzfCommandDefinitionDefaultOption, FzfCommandDynamicOption, Resource, SourceFuncArgs } from "@/type"

// eslint-disable-next-line @typescript-eslint/require-await
export const directoryFiles = async ({ args }: SourceFuncArgs): Promise<Resource> => {
  const arg = args[0] != null ? args[0] : ""
  const lines = (await execDirectoryFiles(arg)).filter((file) => file !== "" && !file.includes(" "))
  const options: FzfCommandDynamicOption | undefined = arg ? { "--header": `"[Directory] ${arg}"` } : undefined

  return {
    type: "json",
    lines: lines.map((line) => ({
      data: {
        command: "FzfPreviewDirectoryFiles",
        type: "file",
        file: line,
      },
      displayText: colorizeFile(line),
    })),
    options,
  }
}

export const directoryFilesDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"DirectoryFiles> "',
  "--multi": true,
  "--preview": filePreviewCommand(),
  "--keep-right": true,
})

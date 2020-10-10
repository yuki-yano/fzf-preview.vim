import { execProjectFiles } from "@/connector/project-files"
import { isGitDirectory } from "@/connector/util"
import { colorizeFile } from "@/fzf/syntax/colorize"
import { filePreviewCommand } from "@/fzf/util"
import type { FzfCommandDefinitionDefaultOption, Resource, SourceFuncArgs } from "@/type"

export const projectFiles = async (_args: SourceFuncArgs): Promise<Resource> => {
  if (!(await isGitDirectory())) {
    throw new Error("The current directory is not a git project")
  }

  const lines = (await execProjectFiles()).filter((file) => file !== "" && !file.includes(" "))

  return {
    type: "json",
    lines: lines.map((line) => ({
      data: {
        command: "FzfPreviewProjectFiles",
        type: "file",
        file: line,
      },
      displayText: colorizeFile(line),
    })),
  }
}

export const projectFilesDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"ProjectFiles> "',
  "--multi": true,
  "--preview": filePreviewCommand(),
  "--keep-right": true,
})

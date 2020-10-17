import { execGitFiles } from "@/connector/git"
import { isGitDirectory } from "@/connector/util"
import { colorizeFile } from "@/fzf/syntax/colorize"
import { filePreviewCommand } from "@/fzf/util"
import type { FzfCommandDefinitionDefaultOption, Resource, SourceFuncArgs } from "@/type"

export const gitFiles = async (_args: SourceFuncArgs): Promise<Resource> => {
  if (!(await isGitDirectory())) {
    throw new Error("The current directory is not a git project")
  }

  const lines = (await execGitFiles()).filter((file) => file !== "" && !file.includes(" "))

  return {
    type: "json",
    lines: lines.map((line) => ({
      data: {
        command: "FzfPreviewGitFiles",
        type: "file",
        file: line,
      },
      displayText: colorizeFile(line),
    })),
  }
}

export const gitFilesDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"GitFiles> "',
  "--multi": true,
  "--preview": filePreviewCommand(),
  "--keep-right": true,
})

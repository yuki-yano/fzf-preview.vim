import { isGitDirectory } from "@/connector/util"
import { colorizeFile } from "@/fzf/syntax/colorize"
import { filePreviewCommand } from "@/fzf/util"
import { getCurrentFilePath, getCurrentPath } from "@/system/file"
import { readMrwFile } from "@/system/mr"
import { filterProjectEnabledFile } from "@/system/project"
import type { FzfCommandDefinitionDefaultOption, Resource, ResourceLines, SourceFuncArgs } from "@/type"

export const projectMrwFiles = async (_args: SourceFuncArgs): Promise<Resource> => {
  if (!(await isGitDirectory())) {
    throw new Error("The current directory is not a git project")
  }

  const currentFile = await getCurrentFilePath()
  const currentPath = await getCurrentPath()
  const files = await filterProjectEnabledFile(
    readMrwFile().filter((file) => file !== currentFile),
    currentPath
  )
  const resourceLines: ResourceLines = files.map((file) => ({
    data: {
      command: "FzfPreviewProjectMrwFiles",
      type: "file",
      file,
    },
    displayText: colorizeFile(file),
  }))

  return {
    type: "json",
    lines: resourceLines,
  }
}

export const projectMrwFilesDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"ProjectMrwFiles> "',
  "--multi": true,
  "--preview": filePreviewCommand(),
  "--keep-right": true,
})

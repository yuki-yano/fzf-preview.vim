import { isGitDirectory } from "@/connector/util"
import { colorizeFile } from "@/fzf/syntax/colorize"
import { filePreviewCommand } from "@/fzf/util"
import { getCurrentFilePath } from "@/system/file"
import { readMruFile } from "@/system/mr"
import { filterProjectEnabledFile } from "@/system/project"
import type { FzfCommandDefinitionDefaultOption, Resource, ResourceLines, SourceFuncArgs } from "@/type"

export const projectMruFiles = async (_args: SourceFuncArgs): Promise<Resource> => {
  const currentFile = await getCurrentFilePath()

  if (!(await isGitDirectory())) {
    throw new Error("The current directory is not a git project")
  }

  const files = await filterProjectEnabledFile(readMruFile().filter((file) => file !== currentFile))
  const resourceLines: ResourceLines = files.map((file) => ({
    data: {
      command: "FzfPreviewProjectMruFiles",
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

export const projectMruFilesDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"ProjectMruFiles> "',
  "--multi": true,
  "--preview": filePreviewCommand(),
  "--keep-right": true,
})

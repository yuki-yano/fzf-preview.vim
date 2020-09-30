import { getOldFiles } from "@/connector/old-files"
import { isGitDirectory } from "@/connector/util"
import { colorizeFile } from "@/fzf/syntax/colorize"
import { filePreviewCommand } from "@/fzf/util"
import { filterProjectEnabledFile } from "@/system/project"
import type { FzfCommandDefinitionDefaultOption, Resource, ResourceLines, SourceFuncArgs } from "@/type"

export const projectOldFiles = async (_args: SourceFuncArgs): Promise<Resource> => {
  if (!(await isGitDirectory())) {
    throw new Error("The current directory is not a git project")
  }

  const files = await filterProjectEnabledFile(await getOldFiles())
  const resourceLines: ResourceLines = files.map((file) => ({
    data: {
      command: "FzfPreviewProjectOldFiles",
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

export const projectOldFilesDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"ProjectOldFiles> "',
  "--multi": true,
  "--preview": filePreviewCommand(),
  "--keep-right": true,
})

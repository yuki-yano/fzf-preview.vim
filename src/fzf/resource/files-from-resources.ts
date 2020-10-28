import { uniqWith } from "lodash"

import type { FILE_RESOURCES } from "@/const/fzf-option"
import { fileFormatBuffers } from "@/fzf/resource/buffers"
import { directoryFiles } from "@/fzf/resource/directory-files"
import { gitFiles } from "@/fzf/resource/git-files"
import { mruFiles } from "@/fzf/resource/mru"
import { mrwFiles } from "@/fzf/resource/mrw"
import { oldFiles } from "@/fzf/resource/oldfiles"
import { projectFiles } from "@/fzf/resource/project-files"
import { projectMruFiles } from "@/fzf/resource/project-mru"
import { projectMrwFiles } from "@/fzf/resource/project-mrw"
import { projectOldFiles } from "@/fzf/resource/project-oldfiles"
import { colorizeFile } from "@/fzf/syntax/colorize"
import { filePreviewCommand } from "@/fzf/util"
import type { FileData, FzfCommandDefinitionDefaultOption, Resource, ResourceLines, SourceFuncArgs } from "@/type"

type ResourceFunctions = {
  [key in typeof FILE_RESOURCES[number]]: (args: SourceFuncArgs) => Promise<Resource>
}

const resourceFunctions: ResourceFunctions = {
  project: projectFiles,
  git: gitFiles,
  directory: directoryFiles,
  buffer: fileFormatBuffers,
  project_old: projectOldFiles,
  project_mru: projectMruFiles,
  project_mrw: projectMrwFiles,
  old: oldFiles,
  mru: mruFiles,
  mrw: mrwFiles,
}

export const filesFromResources = async (args: SourceFuncArgs): Promise<Resource> => {
  const emptySourceFuncArgs = { args: [], extraArgs: [] }
  const lines: ResourceLines = []

  for (const resource of args.args) {
    // eslint-disable-next-line no-await-in-loop
    const filesFromResource = await resourceFunctions[resource as typeof FILE_RESOURCES[number]](emptySourceFuncArgs)
    lines.push(...filesFromResource.lines)
  }

  const uniqLines = uniqWith(lines, (line1, line2) => {
    if (
      (line1.data.type === "file" || line1.data.type === "buffer") &&
      (line2.data.type === "file" || line2.data.type === "buffer")
    ) {
      return line1.data.file === line2.data.file
    }

    return true
  })

  return {
    type: "json",
    lines: uniqLines.map((line) => ({
      data: {
        command: "FzfPreviewFromResources",
        type: "file",
        file: (line.data as FileData).file,
      },
      displayText: colorizeFile((line.data as FileData).file),
    })),
    options: { "--header": `"[Resources] ${args.args.join(" ")}"` },
  }
}

export const filesFromResourcesDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"ResourceFrom> "',
  "--multi": true,
  "--preview": filePreviewCommand(),
  "--keep-right": true,
})

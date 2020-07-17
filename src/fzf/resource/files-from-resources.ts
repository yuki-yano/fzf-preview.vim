import { FILE_RESOURCES } from "@/const/fzf-option"
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
import { filePreviewCommand } from "@/fzf/util"
import type { FzfCommandDefinitionDefaultOption, Resource, ResourceLines, SourceFuncArgs } from "@/type"

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
  const files: ResourceLines = []

  for (const resource of args.args) {
    // eslint-disable-next-line no-await-in-loop
    const filesFromResource = await resourceFunctions[resource as typeof FILE_RESOURCES[number]](emptySourceFuncArgs)
    files.push(...filesFromResource.lines)
  }

  const lines = Array.from(new Set(files))

  return { lines, options: { "--header": `"Resources: ${args.args.join(" ")}"` } }
}

export const filesFromResourcesDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"ResourceFrom> "',
  "--multi": true,
  "--preview": filePreviewCommand(),
})

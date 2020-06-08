import type { FzfCommand } from "@/type"
import { projectFiles, projectFilesDefaultOptions, gitFiles, gitFilesDefaultOptions } from "@/fzf/resource"
import { openFileProcessors } from "@/fzf/processor"

const vimCommandOptions = {
  nargs: "?",
  sync: true
} as const

export const commandDefinition: ReadonlyArray<FzfCommand> = [
  {
    commandName: "TSFzfPreviewProjectFiles",
    sourceFunc: projectFiles,
    vimCommandOptions,
    defaultFzfOptionFunc: projectFilesDefaultOptions,
    defaultProcessors: openFileProcessors,
    enableDevIcons: true
  },
  {
    commandName: "TSFzfPreviewGitStatus",
    sourceFunc: gitFiles,
    vimCommandOptions,
    defaultFzfOptionFunc: gitFilesDefaultOptions,
    defaultProcessors: openFileProcessors,
    enableDevIcons: false,
    optionalUnnecessaryPrefixLength: 3
  }
] as const

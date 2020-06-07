import type { FzfCommand } from "@/type"
import { projectFiles, projectFilesDefaultOptions } from "@/fzf/resource"
import { openFileProcessors } from "@/fzf/processor"

export const commandDefinition: ReadonlyArray<FzfCommand> = [
  {
    commandName: "TSFzfPreviewProjectFiles",
    sourceFunc: projectFiles,
    vimCommandOptions: {
      nargs: "?",
      sync: true
    },
    defaultFzfOptionFunc: projectFilesDefaultOptions,
    defaultProcessors: openFileProcessors,
    enableDevIcons: true
  }
] as const

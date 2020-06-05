import { handlers } from "@/fzf/handler"
import * as cwh from "@/const/command-with-handler"
import type { FzfCommand } from "@/type"
import { projectFiles, projectFilesDefaultOptions } from "@/fzf/resource"
import { defaultProcessors as openFileDefaultProcessors } from "@/fzf/processor/open-file"

export const commandDefinition: ReadonlyArray<FzfCommand> = [
  {
    commandName: cwh.fzfPreviewProjectFiles.command,
    sourceFunc: projectFiles,
    handlerName: cwh.fzfPreviewProjectFiles.handler,
    handlerFunction: handlers[cwh.fzfPreviewProjectFiles.handler],
    vimCommandOptions: {
      nargs: "?",
      sync: true
    },
    defaultFzfOptionFunc: projectFilesDefaultOptions,
    defaultProcessors: openFileDefaultProcessors
  }
] as const

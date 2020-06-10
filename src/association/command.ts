import { parseDictionaryFilesArgs } from "@/args"
import { openFileProcessors } from "@/fzf/processor"
import {
  buffers,
  buffersDefaultOptions,
  directoryFiles,
  directoryFilesDefaultOptions,
  gitFiles,
  gitFilesDefaultOptions,
  gitStatus,
  gitStatusDefaultOptions,
  projectFiles,
  projectFilesDefaultOptions
} from "@/fzf/resource"
import type { FzfCommand } from "@/type"

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
    commandName: "TSFzfPreviewGitFiles",
    sourceFunc: gitFiles,
    vimCommandOptions,
    defaultFzfOptionFunc: gitFilesDefaultOptions,
    defaultProcessors: openFileProcessors,
    enableDevIcons: true
  },
  {
    commandName: "TSFzfPreviewDirectoryFiles",
    sourceFunc: directoryFiles,
    sourceFuncArgsParser: parseDictionaryFilesArgs,
    vimCommandOptions,
    defaultFzfOptionFunc: directoryFilesDefaultOptions,
    defaultProcessors: openFileProcessors,
    enableDevIcons: true
  },
  {
    commandName: "TSFzfPreviewGitStatus",
    sourceFunc: gitStatus,
    vimCommandOptions,
    defaultFzfOptionFunc: gitStatusDefaultOptions,
    defaultProcessors: openFileProcessors,
    enableDevIcons: false,
    optionalUnnecessaryPrefixLength: 3
  },
  {
    commandName: "TSFzfPreviewBuffers",
    sourceFunc: buffers,
    vimCommandOptions,
    defaultFzfOptionFunc: buffersDefaultOptions,
    defaultProcessors: openFileProcessors,
    enableDevIcons: true
  }
] as const

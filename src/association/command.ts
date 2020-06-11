import { parseDictionaryFilesArgs } from "@/args"
import { openFileProcesses } from "@/fzf/process"
import {
  allBuffers,
  allBuffersDefaultOptions,
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
    defaultProcesses: openFileProcesses,
    enableDevIcons: true
  },
  {
    commandName: "TSFzfPreviewGitFiles",
    sourceFunc: gitFiles,
    vimCommandOptions,
    defaultFzfOptionFunc: gitFilesDefaultOptions,
    defaultProcesses: openFileProcesses,
    enableDevIcons: true
  },
  {
    commandName: "TSFzfPreviewDirectoryFiles",
    sourceFunc: directoryFiles,
    sourceFuncArgsParser: parseDictionaryFilesArgs,
    vimCommandOptions,
    defaultFzfOptionFunc: directoryFilesDefaultOptions,
    defaultProcesses: openFileProcesses,
    enableDevIcons: true
  },
  {
    commandName: "TSFzfPreviewGitStatus",
    sourceFunc: gitStatus,
    vimCommandOptions,
    defaultFzfOptionFunc: gitStatusDefaultOptions,
    defaultProcesses: openFileProcesses,
    enableDevIcons: false,
    optionalUnnecessaryPrefixLength: 3
  },
  {
    commandName: "TSFzfPreviewBuffers",
    sourceFunc: buffers,
    vimCommandOptions,
    defaultFzfOptionFunc: buffersDefaultOptions,
    defaultProcesses: openFileProcesses,
    enableDevIcons: true
  },
  {
    commandName: "TSFzfPreviewAllBuffers",
    sourceFunc: allBuffers,
    vimCommandOptions,
    defaultFzfOptionFunc: allBuffersDefaultOptions,
    defaultProcesses: openFileProcesses,
    enableDevIcons: false
  }
] as const

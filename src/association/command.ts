import { parseDictionaryFilesArgs, parseGrepArgs } from "@/args"
import { convertGrepToFileAndText, convertIdentity, convertLineToFileAndText, convertTags } from "@/fzf/converter"
import { openFileProcesses } from "@/fzf/process"
import {
  allBuffers,
  allBuffersDefaultOptions,
  bufferLines,
  bufferLinesDefaultOptions,
  buffers,
  buffersDefaultOptions,
  bufferTags,
  bufferTagsDefaultOptions,
  changes,
  changesDefaultOptions,
  ctags,
  ctagsDefaultOptions,
  directoryFiles,
  directoryFilesDefaultOptions,
  dispatchDefaultQueryForCommandGrep,
  dropBufnr,
  dropGitStatusPrefix,
  gitFiles,
  gitFilesDefaultOptions,
  gitStatus,
  gitStatusDefaultOptions,
  jumps,
  jumpsDefaultOptions,
  lines,
  linesDefaultOptions,
  locationList,
  locationListDefaultOptions,
  marks,
  marksDefaultOptions,
  mruFiles,
  mruFilesDefaultOptions,
  mrwFiles,
  mrwFilesDefaultOptions,
  oldFiles,
  oldFilesDefaultOptions,
  projectCommandGrep,
  projectCommandGrepDefaultOptions,
  projectFiles,
  projectFilesDefaultOptions,
  projectGrep,
  projectGrepDefaultOptions,
  projectMruFiles,
  projectMruFilesDefaultOptions,
  projectMrwFiles,
  projectMrwFilesDefaultOptions,
  projectOldFiles,
  projectOldFilesDefaultOptions,
  quickFix,
  quickFixDefaultOptions
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
    convertLine: convertIdentity,
    vimCommandOptions,
    defaultFzfOptionFunc: projectFilesDefaultOptions,
    defaultProcesses: openFileProcesses,
    enableDevIcons: true
  },
  {
    commandName: "TSFzfPreviewGitFiles",
    sourceFunc: gitFiles,
    convertLine: convertIdentity,
    vimCommandOptions,
    defaultFzfOptionFunc: gitFilesDefaultOptions,
    defaultProcesses: openFileProcesses,
    enableDevIcons: true
  },
  {
    commandName: "TSFzfPreviewDirectoryFiles",
    sourceFunc: directoryFiles,
    convertLine: convertIdentity,
    sourceFuncArgsParser: parseDictionaryFilesArgs,
    vimCommandOptions,
    defaultFzfOptionFunc: directoryFilesDefaultOptions,
    defaultProcesses: openFileProcesses,
    enableDevIcons: true
  },
  {
    commandName: "TSFzfPreviewGitStatus",
    sourceFunc: gitStatus,
    convertLine: dropGitStatusPrefix,
    vimCommandOptions,
    defaultFzfOptionFunc: gitStatusDefaultOptions,
    defaultProcesses: openFileProcesses,
    enableDevIcons: false
  },
  {
    commandName: "TSFzfPreviewBuffers",
    sourceFunc: buffers,
    convertLine: convertIdentity,
    vimCommandOptions,
    defaultFzfOptionFunc: buffersDefaultOptions,
    defaultProcesses: openFileProcesses,
    enableDevIcons: true
  },
  {
    commandName: "TSFzfPreviewAllBuffers",
    sourceFunc: allBuffers,
    convertLine: dropBufnr,
    vimCommandOptions,
    defaultFzfOptionFunc: allBuffersDefaultOptions,
    defaultProcesses: openFileProcesses,
    enableDevIcons: false
  },
  {
    commandName: "TSFzfPreviewProjectOldFiles",
    sourceFunc: projectOldFiles,
    convertLine: convertIdentity,
    vimCommandOptions,
    defaultFzfOptionFunc: projectOldFilesDefaultOptions,
    defaultProcesses: openFileProcesses,
    enableDevIcons: true
  },
  {
    commandName: "TSFzfPreviewProjectMruFiles",
    sourceFunc: projectMruFiles,
    convertLine: convertIdentity,
    vimCommandOptions,
    defaultFzfOptionFunc: projectMruFilesDefaultOptions,
    defaultProcesses: openFileProcesses,
    enableDevIcons: true
  },
  {
    commandName: "TSFzfPreviewProjectMrwFiles",
    sourceFunc: projectMrwFiles,
    convertLine: convertIdentity,
    vimCommandOptions,
    defaultFzfOptionFunc: projectMrwFilesDefaultOptions,
    defaultProcesses: openFileProcesses,
    enableDevIcons: true
  },
  {
    commandName: "TSFzfPreviewLines",
    sourceFunc: lines,
    convertLine: convertLineToFileAndText,
    vimCommandOptions,
    defaultFzfOptionFunc: linesDefaultOptions,
    defaultProcesses: openFileProcesses,
    enableDevIcons: false
  },
  {
    commandName: "TSFzfPreviewBufferLines",
    sourceFunc: bufferLines,
    convertLine: convertIdentity,
    vimCommandOptions,
    defaultFzfOptionFunc: bufferLinesDefaultOptions,
    defaultProcesses: openFileProcesses,
    enableDevIcons: true
  },
  {
    commandName: "TSFzfPreviewCtags",
    sourceFunc: ctags,
    convertLine: convertTags,
    vimCommandOptions,
    defaultFzfOptionFunc: ctagsDefaultOptions,
    defaultProcesses: openFileProcesses,
    enableDevIcons: false
  },
  {
    commandName: "TSFzfPreviewBufferTags",
    sourceFunc: bufferTags,
    convertLine: convertLineToFileAndText,
    vimCommandOptions,
    defaultFzfOptionFunc: bufferTagsDefaultOptions,
    defaultProcesses: openFileProcesses,
    enableDevIcons: false
  },
  {
    commandName: "TSFzfPreviewOldFiles",
    sourceFunc: oldFiles,
    convertLine: convertIdentity,
    vimCommandOptions,
    defaultFzfOptionFunc: oldFilesDefaultOptions,
    defaultProcesses: openFileProcesses,
    enableDevIcons: true
  },
  {
    commandName: "TSFzfPreviewMruFiles",
    sourceFunc: mruFiles,
    convertLine: convertIdentity,
    vimCommandOptions,
    defaultFzfOptionFunc: mruFilesDefaultOptions,
    defaultProcesses: openFileProcesses,
    enableDevIcons: true
  },
  {
    commandName: "TSFzfPreviewMrwFiles",
    sourceFunc: mrwFiles,
    convertLine: convertIdentity,
    vimCommandOptions,
    defaultFzfOptionFunc: mrwFilesDefaultOptions,
    defaultProcesses: openFileProcesses,
    enableDevIcons: true
  },
  {
    commandName: "TSFzfPreviewQuickFix",
    sourceFunc: quickFix,
    convertLine: convertGrepToFileAndText,
    vimCommandOptions,
    defaultFzfOptionFunc: quickFixDefaultOptions,
    defaultProcesses: openFileProcesses,
    enableDevIcons: true
  },
  {
    commandName: "TSFzfPreviewLocationList",
    sourceFunc: locationList,
    convertLine: convertGrepToFileAndText,
    vimCommandOptions,
    defaultFzfOptionFunc: locationListDefaultOptions,
    defaultProcesses: openFileProcesses,
    enableDevIcons: true
  },
  {
    commandName: "TSFzfPreviewJumps",
    sourceFunc: jumps,
    convertLine: convertGrepToFileAndText,
    vimCommandOptions,
    defaultFzfOptionFunc: jumpsDefaultOptions,
    defaultProcesses: openFileProcesses,
    enableDevIcons: true
  },
  {
    commandName: "TSFzfPreviewChanges",
    sourceFunc: changes,
    convertLine: convertLineToFileAndText,
    vimCommandOptions,
    defaultFzfOptionFunc: changesDefaultOptions,
    defaultProcesses: openFileProcesses,
    enableDevIcons: false
  },
  {
    commandName: "TSFzfPreviewMarks",
    sourceFunc: marks,
    convertLine: convertGrepToFileAndText,
    vimCommandOptions,
    defaultFzfOptionFunc: marksDefaultOptions,
    defaultProcesses: openFileProcesses,
    enableDevIcons: true
  },
  {
    commandName: "TSFzfPreviewProjectGrep",
    sourceFunc: projectGrep,
    convertLine: convertGrepToFileAndText,
    sourceFuncArgsParser: parseGrepArgs,
    vimCommandOptions,
    defaultFzfOptionFunc: projectGrepDefaultOptions,
    defaultProcesses: openFileProcesses,
    enableDevIcons: true
  },
  {
    commandName: "TSFzfPreviewProjectCommandGrep",
    sourceFunc: projectCommandGrep,
    convertLine: convertGrepToFileAndText,
    sourceFuncArgsParser: parseGrepArgs,
    vimCommandOptions,
    defaultFzfOptionFunc: projectCommandGrepDefaultOptions,
    defaultProcesses: openFileProcesses,
    enableDevIcons: false,
    beforeCommandHook: dispatchDefaultQueryForCommandGrep
  }
] as const

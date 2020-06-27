import { parseDictionaryFilesArgs, parseGrepArgs } from "@/args"
import { parseResources } from "@/args/files-from-resources-parser"
import { convertGrepToFileAndText, convertIdentity, convertLineToFileAndText, convertTags } from "@/fzf/converter"
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
  filesFromResources,
  filesFromResourcesDefaultOptions,
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
    defaultProcessesName: "open-file",
    enableDevIcons: true
  },
  {
    commandName: "TSFzfPreviewGitFiles",
    sourceFunc: gitFiles,
    convertLine: convertIdentity,
    vimCommandOptions,
    defaultFzfOptionFunc: gitFilesDefaultOptions,
    defaultProcessesName: "open-file",
    enableDevIcons: true
  },
  {
    commandName: "TSFzfPreviewDirectoryFiles",
    sourceFunc: directoryFiles,
    convertLine: convertIdentity,
    sourceFuncArgsParser: parseDictionaryFilesArgs,
    vimCommandOptions,
    defaultFzfOptionFunc: directoryFilesDefaultOptions,
    defaultProcessesName: "open-file",
    enableDevIcons: true
  },
  {
    commandName: "TSFzfPreviewGitStatus",
    sourceFunc: gitStatus,
    convertLine: dropGitStatusPrefix,
    vimCommandOptions,
    defaultFzfOptionFunc: gitStatusDefaultOptions,
    defaultProcessesName: "open-file",
    enableDevIcons: false
  },
  {
    commandName: "TSFzfPreviewBuffers",
    sourceFunc: buffers,
    convertLine: convertIdentity,
    vimCommandOptions,
    defaultFzfOptionFunc: buffersDefaultOptions,
    defaultProcessesName: "open-file",
    enableDevIcons: true
  },
  {
    commandName: "TSFzfPreviewAllBuffers",
    sourceFunc: allBuffers,
    convertLine: dropBufnr,
    vimCommandOptions,
    defaultFzfOptionFunc: allBuffersDefaultOptions,
    defaultProcessesName: "open-file",
    enableDevIcons: false
  },
  {
    commandName: "TSFzfPreviewProjectOldFiles",
    sourceFunc: projectOldFiles,
    convertLine: convertIdentity,
    vimCommandOptions,
    defaultFzfOptionFunc: projectOldFilesDefaultOptions,
    defaultProcessesName: "open-file",
    enableDevIcons: true
  },
  {
    commandName: "TSFzfPreviewProjectMruFiles",
    sourceFunc: projectMruFiles,
    convertLine: convertIdentity,
    vimCommandOptions,
    defaultFzfOptionFunc: projectMruFilesDefaultOptions,
    defaultProcessesName: "open-file",
    enableDevIcons: true
  },
  {
    commandName: "TSFzfPreviewProjectMrwFiles",
    sourceFunc: projectMrwFiles,
    convertLine: convertIdentity,
    vimCommandOptions,
    defaultFzfOptionFunc: projectMrwFilesDefaultOptions,
    defaultProcessesName: "open-file",
    enableDevIcons: true
  },
  {
    commandName: "TSFzfPreviewLines",
    sourceFunc: lines,
    convertLine: convertLineToFileAndText,
    vimCommandOptions,
    defaultFzfOptionFunc: linesDefaultOptions,
    defaultProcessesName: "open-file",
    enableDevIcons: false
  },
  {
    commandName: "TSFzfPreviewBufferLines",
    sourceFunc: bufferLines,
    convertLine: convertIdentity,
    vimCommandOptions,
    defaultFzfOptionFunc: bufferLinesDefaultOptions,
    defaultProcessesName: "open-file",
    enableDevIcons: true
  },
  {
    commandName: "TSFzfPreviewCtags",
    sourceFunc: ctags,
    convertLine: convertTags,
    vimCommandOptions,
    defaultFzfOptionFunc: ctagsDefaultOptions,
    defaultProcessesName: "open-file",
    enableDevIcons: false
  },
  {
    commandName: "TSFzfPreviewBufferTags",
    sourceFunc: bufferTags,
    convertLine: convertLineToFileAndText,
    vimCommandOptions,
    defaultFzfOptionFunc: bufferTagsDefaultOptions,
    defaultProcessesName: "open-file",
    enableDevIcons: false
  },
  {
    commandName: "TSFzfPreviewOldFiles",
    sourceFunc: oldFiles,
    convertLine: convertIdentity,
    vimCommandOptions,
    defaultFzfOptionFunc: oldFilesDefaultOptions,
    defaultProcessesName: "open-file",
    enableDevIcons: true
  },
  {
    commandName: "TSFzfPreviewMruFiles",
    sourceFunc: mruFiles,
    convertLine: convertIdentity,
    vimCommandOptions,
    defaultFzfOptionFunc: mruFilesDefaultOptions,
    defaultProcessesName: "open-file",
    enableDevIcons: true
  },
  {
    commandName: "TSFzfPreviewMrwFiles",
    sourceFunc: mrwFiles,
    convertLine: convertIdentity,
    vimCommandOptions,
    defaultFzfOptionFunc: mrwFilesDefaultOptions,
    defaultProcessesName: "open-file",
    enableDevIcons: true
  },
  {
    commandName: "TSFzfPreviewQuickFix",
    sourceFunc: quickFix,
    convertLine: convertGrepToFileAndText,
    vimCommandOptions,
    defaultFzfOptionFunc: quickFixDefaultOptions,
    defaultProcessesName: "open-file",
    enableDevIcons: true
  },
  {
    commandName: "TSFzfPreviewLocationList",
    sourceFunc: locationList,
    convertLine: convertGrepToFileAndText,
    vimCommandOptions,
    defaultFzfOptionFunc: locationListDefaultOptions,
    defaultProcessesName: "open-file",
    enableDevIcons: true
  },
  {
    commandName: "TSFzfPreviewJumps",
    sourceFunc: jumps,
    convertLine: convertGrepToFileAndText,
    vimCommandOptions,
    defaultFzfOptionFunc: jumpsDefaultOptions,
    defaultProcessesName: "open-file",
    enableDevIcons: true
  },
  {
    commandName: "TSFzfPreviewChanges",
    sourceFunc: changes,
    convertLine: convertLineToFileAndText,
    vimCommandOptions,
    defaultFzfOptionFunc: changesDefaultOptions,
    defaultProcessesName: "open-file",
    enableDevIcons: false
  },
  {
    commandName: "TSFzfPreviewMarks",
    sourceFunc: marks,
    convertLine: convertGrepToFileAndText,
    vimCommandOptions,
    defaultFzfOptionFunc: marksDefaultOptions,
    defaultProcessesName: "open-file",
    enableDevIcons: true
  },
  {
    commandName: "TSFzfPreviewProjectGrep",
    sourceFunc: projectGrep,
    convertLine: convertGrepToFileAndText,
    sourceFuncArgsParser: parseGrepArgs,
    vimCommandOptions,
    defaultFzfOptionFunc: projectGrepDefaultOptions,
    defaultProcessesName: "open-file",
    enableDevIcons: true
  },
  {
    commandName: "TSFzfPreviewProjectCommandGrep",
    sourceFunc: projectCommandGrep,
    convertLine: convertGrepToFileAndText,
    sourceFuncArgsParser: parseGrepArgs,
    vimCommandOptions,
    defaultFzfOptionFunc: projectCommandGrepDefaultOptions,
    defaultProcessesName: "open-file",
    enableDevIcons: false,
    beforeCommandHook: dispatchDefaultQueryForCommandGrep
  },
  {
    commandName: "TSFzfPreviewFromResources",
    sourceFunc: filesFromResources,
    convertLine: convertIdentity,
    sourceFuncArgsParser: parseResources,
    vimCommandOptions,
    defaultFzfOptionFunc: filesFromResourcesDefaultOptions,
    defaultProcessesName: "open-file",
    enableDevIcons: true
  }
] as const

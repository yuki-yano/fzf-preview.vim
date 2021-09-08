import type { ReadonlyDeep } from "type-fest"

import type {
  FzfCommandDynamicOption,
  FzfCommandName,
  GitAction,
  GitBranchAction,
  GitLogAction,
  GitReflogAction,
  GitStashAction,
  GitStatusAction,
} from "@/type"

export type FileData = ReadonlyDeep<{
  command: FzfCommandName
  type: "file"
  file: string
  lineNumber?: undefined
}>

export type LineData = ReadonlyDeep<{
  command: FzfCommandName
  type: "line"
  file: string
  lineNumber: number
  text: string
}>

type BufferData = ReadonlyDeep<{
  command: FzfCommandName
  type: "buffer"
  file: string
  bufnr: number
  lineNumber?: undefined
}>

type CommandPaletteData = ReadonlyDeep<{
  command: FzfCommandName
  type: "command-palette"
  name: string
  lineNumber?: undefined
}>

type GitActionData = ReadonlyDeep<{
  command: FzfCommandName
  type: "git-actions"
  action: GitAction
  lineNumber?: undefined
}>

export type GitStatusData = ReadonlyDeep<{
  command: FzfCommandName
  type: "git-status"
  action?: "header"
  file: string
  status: string
  lineNumber?: undefined
}>

type GitStatusActionData = ReadonlyDeep<{
  command: FzfCommandName
  type: "git-status-actions"
  action: GitStatusAction
  files: ReadonlyArray<string>
  lineNumber?: undefined
}>

export type GitBranchData = ReadonlyDeep<{
  command: FzfCommandName
  type: "git-branch"
  name: string
  date: string
  author: string
  isCreate: boolean
  lineNumber?: undefined
}>

type GitBranchActionData = ReadonlyDeep<{
  command: FzfCommandName
  type: "git-branch-actions"
  action: GitBranchAction
  branches: ReadonlyArray<string>
  lineNumber?: undefined
}>

export type GitLogData = ReadonlyDeep<{
  command: FzfCommandName
  type: "git-log"
  hash: string
  date: string
  author: string
  comment: string
  isCurrentFile: boolean
  lineNumber?: undefined
}>

type GitLogActionData = ReadonlyDeep<{
  command: FzfCommandName
  type: "git-log-actions"
  action: GitLogAction
  hashes: ReadonlyArray<string>
  isCurrentFile: boolean
  lineNumber?: undefined
}>

export type GitStashData = ReadonlyDeep<{
  command: FzfCommandName
  type: "git-stash"
  name: string
  hash: string
  date: string
  author: string
  comment: string
  isCreate: boolean
  lineNumber?: undefined
}>

type GitStashActionData = ReadonlyDeep<{
  command: FzfCommandName
  type: "git-stash-actions"
  action: GitStashAction
  names: ReadonlyArray<string>
  hashes: ReadonlyArray<string>
  lineNumber?: undefined
}>

export type GitReflogData = ReadonlyDeep<{
  command: FzfCommandName
  type: "git-reflog"
  name: string
  hash: string
  date: string
  author: string
  comment: string
  lineNumber?: undefined
}>

type GitReflogActionData = ReadonlyDeep<{
  command: FzfCommandName
  type: "git-reflog-actions"
  action: GitReflogAction
  names: ReadonlyArray<string>
  hashes: ReadonlyArray<string>
  lineNumber?: undefined
}>

type RegisterData = ReadonlyDeep<{
  command: FzfCommandName
  type: "register"
  lineNumber: number
  text: string
  option: string
}>

type GitPrData = ReadonlyDeep<{
  command: FzfCommandName
  type: "git-pr"
  prNumber?: number
  lineNumber?: undefined
}>

export type ResourceData =
  | FileData
  | LineData
  | BufferData
  | CommandPaletteData
  | GitActionData
  | GitStatusData
  | GitStatusActionData
  | GitBranchData
  | GitBranchActionData
  | GitLogData
  | GitLogActionData
  | GitStashData
  | GitStashActionData
  | GitReflogData
  | GitReflogActionData
  | RegisterData
  | GitPrData

export type ResourceLine = ReadonlyDeep<{
  data: ResourceData
  displayText: string
}>

export type ResourceLines = ReadonlyArray<ResourceLine>

type JsonResource = ReadonlyDeep<{
  type: "json"
  lines: ResourceLines
  options?: FzfCommandDynamicOption
}>

type TextResource = ReadonlyDeep<{
  type: "text"
  lines: ResourceLines
  options?: FzfCommandDynamicOption
}>

export type Resource = JsonResource | TextResource

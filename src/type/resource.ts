import type { FzfCommandDynamicOption, FzfCommandName } from "@/type/fzf"
import { GitAction, GitBranchAction, GitLogAction, GitReflogAction, GitStashAction, GitStatusAction } from "@/type/git"

export type FileData = {
  command: FzfCommandName
  type: "file"
  file: string
}

export type LineData = {
  command: FzfCommandName
  type: "line"
  file: string
  lineNumber: number
  text: string
}

export type BufferData = {
  command: FzfCommandName
  type: "buffer"
  file: string
  bufnr: number
}

export type VimCommandData = {
  command: FzfCommandName
  type: "vim-command"
  name: string
}

export type GitActionData = {
  command: FzfCommandName
  type: "git-actions"
  action: GitAction
}

export type GitStatusData = {
  command: FzfCommandName
  type: "git-status"
  file: string
  status: string
}

export type GitStatusActionData = {
  command: FzfCommandName
  type: "git-status-actions"
  action: GitStatusAction
  files: Array<string>
}

export type GitBranchData = {
  command: FzfCommandName
  type: "git-branch"
  name: string
  date: string
  author: string
  isCreate: boolean
}

export type GitBranchActionData = {
  command: FzfCommandName
  type: "git-branch-actions"
  action: GitBranchAction
  branches: Array<string>
}

export type GitLogData = {
  command: FzfCommandName
  type: "git-log"
  hash: string
  date: string
  author: string
  comment: string
  isCurrentFile: boolean
}

export type GitLogActionData = {
  command: FzfCommandName
  type: "git-log-actions"
  action: GitLogAction
  hashes: Array<string>
  isCurrentFile: boolean
}

export type GitStashData = {
  command: FzfCommandName
  type: "git-stash"
  name: string
  hash: string
  date: string
  author: string
  comment: string
  isCreate: boolean
}

export type GitStashActionData = {
  command: FzfCommandName
  type: "git-stash-actions"
  action: GitStashAction
  names: Array<string>
  hashes: Array<string>
}

export type GitReflogData = {
  command: FzfCommandName
  type: "git-reflog"
  name: string
  hash: string
  date: string
  author: string
  comment: string
}

export type GitReflogActionData = {
  command: FzfCommandName
  type: "git-reflog-actions"
  action: GitReflogAction
  names: Array<string>
  hashes: Array<string>
}

export type RegisterData = {
  command: FzfCommandName
  type: "register"
  lineNumber: number
  text: string
  option: string
}

export type GitPrData = {
  command: FzfCommandName
  type: "git-pr"
  prNumber?: number
}

export type ResourceData =
  | FileData
  | LineData
  | BufferData
  | VimCommandData
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

export type ResourceType = ResourceData["type"]

export type ResourceLine = {
  data: ResourceData
  displayText: string
}

export type ResourceLines = Array<ResourceLine>

type JsonResource = {
  type: "json"
  lines: ResourceLines
  options?: FzfCommandDynamicOption
}

type TextResource = {
  type: "text"
  lines: ResourceLines
  options?: FzfCommandDynamicOption
}

export type Resource = JsonResource | TextResource

import type { FzfCommandDynamicOption, FzfCommandName } from "@/type/fzf"
import { GitAction, GitBranchAction, GitLogAction, GitStatusAction } from "@/type/git"

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
  | GitActionData
  | GitStatusData
  | GitStatusActionData
  | GitBranchData
  | GitBranchActionData
  | GitLogData
  | GitLogActionData
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

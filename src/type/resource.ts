import type { FzfCommandDynamicOption, FzfCommandName } from "@/type/fzf"

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

export type GitStatusData = {
  command: FzfCommandName
  type: "git-status"
  file: string
  status: string
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

export type HasFileData = FileData | LineData | BufferData | GitStatusData
export type ResourceData = FileData | LineData | BufferData | GitStatusData | RegisterData | GitPrData
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

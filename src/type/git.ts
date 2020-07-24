import { GIT_ACTIONS, GIT_BRANCH_ACTIONS, GIT_LOG_ACTIONS } from "@/const/git"

export type GitAction = typeof GIT_ACTIONS[number]
export type GitBranchAction = typeof GIT_BRANCH_ACTIONS[number]
export type GitLogAction = typeof GIT_LOG_ACTIONS[number]

export type GitBranch = {
  prefix: string
  name: string
  date: string
  author: string
}

export type GitLog = {
  prefix: string
  hash: string
  date: string
  author: string
  comment: string
}

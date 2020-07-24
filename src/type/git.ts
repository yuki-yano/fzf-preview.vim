import { GIT_ACTIONS, GIT_BRANCH_ACTIONS } from "@/const/git"

export type GitAction = typeof GIT_ACTIONS[number]
export type GitBranchAction = typeof GIT_BRANCH_ACTIONS[number]

export type GitBranch = {
  prefix: string
  name: string
  date: string
  author: string
}

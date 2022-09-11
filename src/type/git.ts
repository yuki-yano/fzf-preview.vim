import type { ReadonlyDeep } from "type-fest"

import type {
  GIT_ACTIONS,
  GIT_BRANCH_ACTIONS,
  GIT_LOG_ACTIONS,
  GIT_REFLOG_ACTIONS,
  GIT_STASH_ACTIONS,
  GIT_STATUS_ACTIONS,
} from "@/const/git"

export type GitAction = typeof GIT_ACTIONS[number] | "header"
export type GitStatusAction = typeof GIT_STATUS_ACTIONS[number] | "header"
export type GitBranchAction = typeof GIT_BRANCH_ACTIONS[number] | "header"
export type GitLogAction = typeof GIT_LOG_ACTIONS[number] | "header"
export type GitStashAction = typeof GIT_STASH_ACTIONS[number] | "header"
export type GitReflogAction = typeof GIT_REFLOG_ACTIONS[number] | "header"

export type GitBranch = ReadonlyDeep<{
  prefix: string
  name: string
  date: string
  author: string
}>

export type GitLog = ReadonlyDeep<{
  prefix: string
  hash: string
  date: string
  author: string
  comment: string
}>

export type GitStash = ReadonlyDeep<{
  prefix: string
  name: string
  hash: string
  date: string
  author: string
  comment: string
}>

export type GitReflog = ReadonlyDeep<{
  prefix: string
  name: string
  hash: string
  date: string
  author: string
  comment: string
}>

export type ParsedGitStatus = ReadonlyDeep<{
  file: string
  status: string
}>

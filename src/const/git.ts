export const GIT_ACTIONS = [
  "status",
  "branch",
  "log",
  "current-log",
  "commit",
  "commit --amend",
  "commit --amend --no-edit",
  "push",
  "push --force",
  "fetch",
  "pull",
] as const
export const GIT_STATUS_ACTIONS = ["add", "reset", "patch", "checkout"] as const
export const GIT_BRANCH_ACTIONS = [
  "diff",
  "checkout",
  "reset",
  "reset --hard",
  "reset --soft",
  "merge",
  "merge --no-ff",
  "rebase",
  "rebase --interactive",
  "delete",
  "delete --force",
  "yank",
] as const
export const GIT_LOG_ACTIONS = [
  "show",
  "diff",
  "reset",
  "reset-hard",
  "reset-soft",
  "checkout",
  "commit --squash",
  "commit --fixup",
  "rebase --interactive",
  "yank",
] as const

export const GIT_BRANCH_COMMAND =
  "git for-each-ref refs/heads refs/remotes --color=always --format='%(color:green)[branch]%(color:reset)    %(color:reset)%(HEAD) %(color:magenta)%(refname:short)%(color:reset)    %(color:yellow)%(authordate:short)%(color:reset)    %(color:blue)[%(authorname)]%(color:reset)%09' 2> /dev/null"

const GIT_BRANCH_PREVIEW_COMMAND_OPTION =
  "--decorate --pretty='format:%C(yellow)%h %C(green)%cd %C(reset)%s %C(red)%d %C(cyan)[%an]' --date=iso --graph --color=always"
export const GIT_BRANCH_PREVIEW_COMMAND = `[[ '{2}' != '*' ]] && git log {2} ${GIT_BRANCH_PREVIEW_COMMAND_OPTION} 2> /dev/null || git log {3} ${GIT_BRANCH_PREVIEW_COMMAND_OPTION} 2> /dev/null`

export const GIT_LOG_PREVIEW_COMMAND = "git show {2} --color=always"

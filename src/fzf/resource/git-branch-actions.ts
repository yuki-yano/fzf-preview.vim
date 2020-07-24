import { isGitDirectory } from "@/connector/util"
import { GIT_BRANCH_ACTIONS } from "@/const/git"
import { currentSessionSelector } from "@/module/selector/session"
import type { FzfCommandDefinitionDefaultOption, Resource, SourceFuncArgs } from "@/type"

export const gitBranchActions = async (_args: SourceFuncArgs): Promise<Resource> => {
  const currentSession = currentSessionSelector()
  if (currentSession == null) {
    throw new Error("Not exists current session")
  } else if (currentSession.gitBranches == null) {
    throw new Error("Branch is not exists in current session")
  }

  const branches = currentSession.gitBranches

  if (!(await isGitDirectory())) {
    throw new Error("The current directory is not a git project")
  }

  return {
    type: "json",
    lines: GIT_BRANCH_ACTIONS.map((action) => ({
      data: {
        command: "FzfPreviewGitBranchActions",
        type: "git-branch-actions",
        action,
        branches: branches.map((branch) => branch.name),
      },
      displayText: action,
    })),
    options: {
      "--header": `"Selected branch: ${branches.map((branch) => branch.name).join(" ")}"`,
    },
  }
}

export const gitBranchActionsDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"GitBranchActions> "',
})

import { isGitDirectory } from "@/connector/util"
import { GIT_BRANCH_ACTIONS } from "@/const/git"
import { currentSessionSelector } from "@/module/selector/session"
import type { FzfCommandDefinitionDefaultOption, Resource, ResourceLine, ResourceLines, SourceFuncArgs } from "@/type"

export const gitBranchActions = async (_args: SourceFuncArgs): Promise<Resource> => {
  const currentSession = currentSessionSelector()
  if (currentSession == null) {
    throw new Error("Not exists current session")
  } else if (currentSession.gitBranches == null) {
    throw new Error("Branch is not exists in current session")
  }
  if (!(await isGitDirectory())) {
    throw new Error("The current directory is not a git project")
  }

  const branches = currentSession.gitBranches
  const headers: ResourceLines = [
    {
      data: {
        command: "FzfPreviewGitBranchActions",
        type: "git-branch-actions",
        action: "header",
        branches: [],
      },
      displayText: "<: Back to git branch",
    },
    {
      data: {
        command: "FzfPreviewGitBranchActions",
        type: "git-branch-actions",
        action: "header",
        branches: [],
      },
      displayText: `Selected branch: ${branches.map((branch) => branch.name).join(" ")}`,
    },
  ]

  const lines = [
    ...headers,
    ...GIT_BRANCH_ACTIONS.map<ResourceLine>((action) => ({
      data: {
        command: "FzfPreviewGitBranchActions",
        type: "git-branch-actions",
        action,
        branches: branches.map((branch) => branch.name),
      },
      displayText: action,
    })),
  ]

  return {
    type: "json",
    lines,
    options: {
      "--header-lines": headers.length.toString(),
    },
  }
}

export const gitBranchActionsDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"GitBranchActions> "',
})

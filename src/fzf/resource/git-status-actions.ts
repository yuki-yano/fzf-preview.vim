import { isGitDirectory } from "@/connector/util"
import { GIT_STATUS_ACTIONS } from "@/const/git"
import { currentSessionSelector } from "@/module/selector/session"
import type { FzfCommandDefinitionDefaultOption, Resource, ResourceLine, ResourceLines, SourceFuncArgs } from "@/type"

export const gitStatusActions = async (_args: SourceFuncArgs): Promise<Resource> => {
  const currentSession = currentSessionSelector()
  if (currentSession == null) {
    throw new Error("Not exists current session")
  } else if (currentSession.gitStatusDataList == null) {
    throw new Error("Selected git status file is not exists in current session")
  }
  if (!(await isGitDirectory())) {
    throw new Error("The current directory is not a git project")
  }

  const statusDataList = currentSession.gitStatusDataList
  const headers: ResourceLines = [
    {
      data: {
        command: "FzfPreviewGitStatusActions",
        type: "git-status-actions",
        action: "header",
        files: [],
      },
      displayText: "<: Back to git status",
    },
    {
      data: {
        command: "FzfPreviewGitStatusActions",
        type: "git-status-actions",
        action: "header",
        files: [],
      },
      displayText: `Selected file: ${statusDataList.map((data) => data.file).join(" ")}`,
    },
  ]

  const lines = [
    ...headers,
    ...GIT_STATUS_ACTIONS.map<ResourceLine>((action) => ({
      data: {
        command: "FzfPreviewGitStatusActions",
        type: "git-status-actions",
        action,
        files: statusDataList.map((data) => data.file),
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

export const gitStatusActionsDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"GitStatusActions> "',
})

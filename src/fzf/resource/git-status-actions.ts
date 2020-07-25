import { isGitDirectory } from "@/connector/util"
import { GIT_STATUS_ACTIONS } from "@/const/git"
import { currentSessionSelector } from "@/module/selector/session"
import type { FzfCommandDefinitionDefaultOption, Resource, SourceFuncArgs } from "@/type"

export const gitStatusActions = async (_args: SourceFuncArgs): Promise<Resource> => {
  const currentSession = currentSessionSelector()
  if (currentSession == null) {
    throw new Error("Not exists current session")
  } else if (currentSession.gitStatusDataList == null) {
    throw new Error("Selected git status file is not exists in current session")
  }

  const statusDataList = currentSession.gitStatusDataList

  if (!(await isGitDirectory())) {
    throw new Error("The current directory is not a git project")
  }

  return {
    type: "json",
    lines: GIT_STATUS_ACTIONS.map((action) => ({
      data: {
        command: "FzfPreviewGitStatusActions",
        type: "git-status-actions",
        action,
        files: statusDataList.map((data) => data.file),
      },
      displayText: action,
    })),
    options: {
      "--header": `"Selected file: ${statusDataList.map((data) => data.file).join(" ")}"`,
    },
  }
}

export const gitStatusActionsDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"GitStatusActions> "',
})

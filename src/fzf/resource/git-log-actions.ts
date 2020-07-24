import { isGitDirectory } from "@/connector/util"
import { GIT_LOG_ACTIONS } from "@/const/git"
import { currentSessionSelector } from "@/module/selector/session"
import type { FzfCommandDefinitionDefaultOption, Resource, SourceFuncArgs } from "@/type"

export const gitLogActions = async (_args: SourceFuncArgs): Promise<Resource> => {
  const currentSession = currentSessionSelector()
  if (currentSession == null) {
    throw new Error("Not exists current session")
  } else if (currentSession.gitLogs == null) {
    throw new Error("Logs is not exists in current session")
  }

  const logs = currentSession.gitLogs

  if (!(await isGitDirectory())) {
    throw new Error("The current directory is not a git project")
  }

  return {
    type: "json",
    lines: GIT_LOG_ACTIONS.map((action) => ({
      data: {
        command: "FzfPreviewGitLogActions",
        type: "git-log-actions",
        action,
        hashes: logs.map((log) => log.hash),
      },
      displayText: action,
    })),
    options: {
      "--header": `"Selected branch: ${logs.map((log) => log.hash).join(" ")}"`,
    },
  }
}

export const gitLogActionsDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"GitLogActions> "',
})

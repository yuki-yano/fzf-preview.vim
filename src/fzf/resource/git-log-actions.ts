import { isGitDirectory } from "@/connector/util"
import { GIT_LOG_ACTIONS } from "@/const/git"
import { currentSessionSelector } from "@/module/selector/session"
import type { FzfCommandDefinitionDefaultOption, Resource, ResourceLine, ResourceLines, SourceFuncArgs } from "@/type"

export const gitLogActions = async (_args: SourceFuncArgs): Promise<Resource> => {
  const currentSession = currentSessionSelector()
  if (currentSession == null) {
    throw new Error("Not exists current session")
  } else if (currentSession.gitLogs == null) {
    throw new Error("Logs is not exists in current session")
  }
  if (!(await isGitDirectory())) {
    throw new Error("The current directory is not a git project")
  }

  const logs = currentSession.gitLogs
  const headers: ResourceLines = [
    {
      data: {
        command: "FzfPreviewGitLogActions",
        type: "git-log-actions",
        action: "header",
        hashes: [],
        isCurrentFile: false,
      },
      displayText: "<: Back to git log",
    },
    {
      data: {
        command: "FzfPreviewGitLogActions",
        type: "git-log-actions",
        action: "header",
        hashes: [],
        isCurrentFile: false,
      },
      displayText: `Selected log: ${logs.map((log) => log.hash).join(" ")}`,
    },
  ]

  const lines = [
    ...headers,
    ...GIT_LOG_ACTIONS.map<ResourceLine>((action) => ({
      data: {
        command: "FzfPreviewGitLogActions",
        type: "git-log-actions",
        action,
        hashes: logs.map((log) => log.hash),
        isCurrentFile: logs[0].isCurrentFile,
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

export const gitLogActionsDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"GitLogActions> "',
})

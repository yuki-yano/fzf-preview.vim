import { isGitDirectory } from "@/connector/util"
import { GIT_REFLOG_ACTIONS } from "@/const/git"
import { currentSessionSelector } from "@/module/selector/session"
import type { FzfCommandDefinitionDefaultOption, Resource, ResourceLine, ResourceLines, SourceFuncArgs } from "@/type"

export const gitReflogActions = async (_args: SourceFuncArgs): Promise<Resource> => {
  const currentSession = currentSessionSelector()
  if (currentSession == null) {
    throw new Error("Not exists current session")
  } else if (currentSession.gitReflogs == null) {
    throw new Error("Reflogs is not exists in current session")
  }
  if (!(await isGitDirectory())) {
    throw new Error("The current directory is not a git project")
  }

  const reflogs = currentSession.gitReflogs
  const headers: ResourceLines = [
    {
      data: {
        command: "FzfPreviewGitReflogActions",
        type: "git-reflog-actions",
        action: "header",
        names: [],
        hashes: [],
      },
      displayText: "<: Back to git reflog",
    },
    {
      data: {
        command: "FzfPreviewGitReflogActions",
        type: "git-reflog-actions",
        action: "header",
        names: [],
        hashes: [],
      },
      displayText: `Selected reflog: ${reflogs.map((reflog) => reflog.name).join(" ")}`,
    },
  ]

  const lines = [
    ...headers,
    ...GIT_REFLOG_ACTIONS.map<ResourceLine>((action) => ({
      data: {
        command: "FzfPreviewGitReflogActions",
        type: "git-reflog-actions",
        action,
        names: reflogs.map((reflog) => reflog.name),
        hashes: reflogs.map((reflog) => reflog.hash),
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

export const gitReflogActionsDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"GitReflogActions> "',
})

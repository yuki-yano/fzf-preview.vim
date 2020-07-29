import { isGitDirectory } from "@/connector/util"
import { GIT_STASH_ACTIONS } from "@/const/git"
import { currentSessionSelector } from "@/module/selector/session"
import type { FzfCommandDefinitionDefaultOption, Resource, ResourceLine, ResourceLines, SourceFuncArgs } from "@/type"

export const gitStashActions = async (_args: SourceFuncArgs): Promise<Resource> => {
  const currentSession = currentSessionSelector()
  if (currentSession == null) {
    throw new Error("Not exists current session")
  } else if (currentSession.gitStashes == null) {
    throw new Error("Stashes is not exists in current session")
  }
  if (!(await isGitDirectory())) {
    throw new Error("The current directory is not a git project")
  }

  const stashes = currentSession.gitStashes
  const headers: ResourceLines = [
    {
      data: {
        command: "FzfPreviewGitStashActions",
        type: "git-stash-actions",
        action: "header",
        names: [],
        hashes: [],
      },
      displayText: "<: Back to git stash",
    },
    {
      data: {
        command: "FzfPreviewGitStashActions",
        type: "git-stash-actions",
        action: "header",
        names: [],
        hashes: [],
      },
      displayText: `Selected stash: ${stashes.map((stash) => stash.name).join(" ")}`,
    },
  ]

  const lines = [
    ...headers,
    ...GIT_STASH_ACTIONS.map<ResourceLine>((action) => ({
      data: {
        command: "FzfPreviewGitStashActions",
        type: "git-stash-actions",
        action,
        names: stashes.map((stash) => stash.name),
        hashes: stashes.map((stash) => stash.hash),
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

export const gitStashActionsDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"GitStashActions> "',
})

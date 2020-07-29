import stripAnsi from "strip-ansi"

import { execGitStash } from "@/connector/git"
import { isGitDirectory } from "@/connector/util"
import { GIT_STASH_PREVIEW_COMMAND } from "@/const/git"
import { colorize } from "@/fzf/syntax/colorize"
import type { FzfCommandDefinitionDefaultOption, Resource, ResourceLine, ResourceLines, SourceFuncArgs } from "@/type"
import { alignLists } from "@/util/align"

const SPACER = "    "

export const gitStashes = async (_args: SourceFuncArgs): Promise<Resource> => {
  if (!(await isGitDirectory())) {
    throw new Error("The current directory is not a git project")
  }

  const stashes = await execGitStash()
  const displayLines = alignLists(
    stashes.map(({ name, hash, date, author, comment }) => [name, hash, date, author, comment])
  ).map((list) => list.join(SPACER).trim())

  const extraActions: ResourceLines = [
    {
      data: {
        command: "FzfPreviewGitStashes",
        type: "git-stash",
        name: "",
        hash: "",
        date: "",
        author: "",
        comment: "",
        isCreate: true,
      },
      displayText: colorize("Create stash", "green"),
    },
  ]

  const lines = [
    ...stashes.map<ResourceLine>(({ name, hash, date, author, comment }, i) => ({
      data: {
        command: "FzfPreviewGitStashes",
        type: "git-stash",
        name: stripAnsi(name).trim(),
        hash: stripAnsi(hash).trim(),
        date: stripAnsi(date).trim(),
        author: stripAnsi(author).trim(),
        comment: stripAnsi(comment).trim(),
        isCreate: false,
      },
      displayText: displayLines[i],
    })),
    ...extraActions,
  ]

  return {
    type: "json",
    lines,
  }
}

export const gitStashesDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--multi": true,
  "--header": '"Enter: git show, C-s: git status, <: Back actions, >: Select action"',
  "--prompt": '"GitStash> "',
  "--preview": `"${GIT_STASH_PREVIEW_COMMAND}"`,
  "--preview-window": '"down:50%"',
})

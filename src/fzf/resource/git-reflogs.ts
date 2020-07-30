import stripAnsi from "strip-ansi"

import { execGitReflog } from "@/connector/git"
import { isGitDirectory } from "@/connector/util"
import { GIT_REFLOG_PREVIEW_COMMAND } from "@/const/git"
import type { FzfCommandDefinitionDefaultOption, Resource, SourceFuncArgs } from "@/type"
import { alignLists } from "@/util/align"

const SPACER = "    "

export const gitReflogs = async (_args: SourceFuncArgs): Promise<Resource> => {
  if (!(await isGitDirectory())) {
    throw new Error("The current directory is not a git project")
  }

  const reflogs = await execGitReflog()
  const displayLines = alignLists(
    reflogs.map(({ name, hash, date, author, comment }) => [name, hash, date, author, comment])
  ).map((list) => list.join(SPACER).trim())

  return {
    type: "json",
    lines: reflogs.map(({ name, hash, date, author, comment }, i) => ({
      data: {
        command: "FzfPreviewGitReflogs",
        type: "git-reflog",
        name: stripAnsi(name).trim(),
        hash: stripAnsi(hash).trim(),
        date: stripAnsi(date).trim(),
        author: stripAnsi(author).trim(),
        comment: stripAnsi(comment).trim(),
      },
      displayText: displayLines[i],
    })),
  }
}

export const gitReflogsDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--multi": true,
  "--header": '"Enter: git show, C-s: git status, <: Back actions, >: Select action"',
  "--prompt": '"GitReflog> "',
  "--preview": `"${GIT_REFLOG_PREVIEW_COMMAND}"`,
  "--preview-window": '"down:50%"',
})

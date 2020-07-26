import { execGitLog } from "@/connector/git"
import { isGitDirectory } from "@/connector/util"
import { GIT_LOG_PREVIEW_COMMAND } from "@/const/git"
import type { FzfCommandDefinitionDefaultOption, GitLog, Resource, SourceFuncArgs } from "@/type"
import { alignLists } from "@/util/align"

const SPACER = "    "

const createResource = (logs: Array<GitLog>, isCurrentFile: boolean): Resource => {
  const displayLines = alignLists(
    logs.map(({ hash, date, author, comment }) => [hash, date, author, comment])
  ).map((list) => list.join(SPACER).trim())

  /* eslint-disable no-control-regex */
  return {
    type: "json",
    lines: logs.map(({ hash, date, author, comment }, i) => ({
      data: {
        command: "FzfPreviewGitLogs",
        type: "git-log",
        hash: hash.replace(/\x1b\[[0-9;]*m/g, "").trim(),
        date: date.replace(/\x1b\[[0-9;]*m/g, "").trim(),
        author: author.replace(/\x1b\[[0-9;]*m/g, "").trim(),
        comment: comment.replace(/\x1b\[[0-9;]*m/g, "").trim(),
        isCurrentFile,
      },
      displayText: displayLines[i],
    })),
  }
  /* eslint-enable no-control-regex */
}

export const gitLogs = async (_args: SourceFuncArgs): Promise<Resource> => {
  if (!(await isGitDirectory())) {
    throw new Error("The current directory is not a git project")
  }

  const logs = await execGitLog()
  return createResource(logs, false)
}

export const gitCurrentLogs = async (_args: SourceFuncArgs): Promise<Resource> => {
  if (!(await isGitDirectory())) {
    throw new Error("The current directory is not a git project")
  }

  const logs = await execGitLog({ currentFile: true })
  return createResource(logs, true)
}

export const gitLogsDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--header": '"Enter: git show, C-q: Back actions, C-s: git status, C-c: Select action"',
  "--prompt": '"GitLog> "',
  "--preview": `"${GIT_LOG_PREVIEW_COMMAND}"`,
  "--preview-window": '"down:50%"',
})

export const gitCurrentLogsDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--header": '"Enter: git show, C-s: git status, C-c: Select action"',
  "--prompt": '"GitCurrentLog> "',
  "--preview": `"${GIT_LOG_PREVIEW_COMMAND}"`,
  "--preview-window": '"down:50%"',
})

import { execGitBranch } from "@/connector/git"
import { isGitDirectory } from "@/connector/util"
import { GIT_BRANCH_PREVIEW_COMMAND } from "@/const/git"
import type { FzfCommandDefinitionDefaultOption, Resource, SourceFuncArgs } from "@/type"
import { alignLists } from "@/util/align"

const SPACER = "    "

export const gitBranches = async (_args: SourceFuncArgs): Promise<Resource> => {
  if (!(await isGitDirectory())) {
    throw new Error("The current directory is not a git project")
  }

  const branches = await execGitBranch()
  const displayLines = alignLists(branches.map(({ name, date, author }) => [name, date, author])).map((list) =>
    list.join(SPACER).trim()
  )

  /* eslint-disable no-control-regex */
  return {
    type: "json",
    lines: branches.map(({ name, date, author }, i) => ({
      data: {
        command: "FzfPreviewGitBranches",
        type: "git-branch",
        name: name
          .replace(/\x1b\[[0-9;]*m/g, "")
          .replace("* ", "")
          .trim(),
        date: date.replace(/\x1b\[[0-9;]*m/g, "").trim(),
        author: author.replace(/\x1b\[[0-9;]*m/g, "").trim(),
      },
      displayText: displayLines[i],
    })),
  }
  /* eslint-enable no-control-regex */
}

export const gitBranchesDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--multi": true,
  "--header": '"Enter: checkout, C-q: Back actions, C-s: git status, C-c: Select action"',
  "--prompt": '"GitBranch> "',
  "--preview": `"${GIT_BRANCH_PREVIEW_COMMAND}"`,
  "--preview-window": '"down:50%"',
})

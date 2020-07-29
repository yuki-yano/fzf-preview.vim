import stripAnsi from "strip-ansi"

import { execGitBranch } from "@/connector/git"
import { isGitDirectory } from "@/connector/util"
import { GIT_BRANCH_PREVIEW_COMMAND } from "@/const/git"
import { colorize } from "@/fzf/syntax/colorize"
import type { FzfCommandDefinitionDefaultOption, Resource, ResourceLine, ResourceLines, SourceFuncArgs } from "@/type"
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

  const extraActions: ResourceLines = [
    {
      data: {
        command: "FzfPreviewGitBranches",
        type: "git-branch",
        name: "",
        date: "",
        author: "",
        isCreate: true,
      },
      displayText: colorize("\xA0\xA0Create branch", "green"),
    },
  ]

  const lines = [
    ...branches.map<ResourceLine>(({ name, date, author }, i) => ({
      data: {
        command: "FzfPreviewGitBranches",
        type: "git-branch",
        name: stripAnsi(name).replace("* ", "").trim(),
        date: stripAnsi(date).trim(),
        author: stripAnsi(author).trim(),
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

export const gitBranchesDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--multi": true,
  "--header": '"Enter: checkout, C-s: git status,<: Back actions,  >: Select action"',
  "--prompt": '"GitBranch> "',
  "--preview": `"${GIT_BRANCH_PREVIEW_COMMAND}"`,
  "--preview-window": '"down:50%"',
})

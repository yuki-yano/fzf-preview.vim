import stripAnsi from "strip-ansi"

import { execGitStatus } from "@/connector/git"
import { isGitDirectory } from "@/connector/util"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import type { FzfCommandDefinitionDefaultOption, Resource, ResourceLine, ResourceLines, SourceFuncArgs } from "@/type"

export const gitStatus = async (_args: SourceFuncArgs): Promise<Resource> => {
  if (!(await isGitDirectory())) {
    throw new Error("The current directory is not a git project")
  }

  const statuses = await execGitStatus()
  const headers: ResourceLines = [
    {
      data: {
        command: "FzfPreviewGitStatus",
        type: "git-status",
        action: "header",
        file: "",
        status: "",
      },
      displayText: "C-a: git add, C-r: git reset, C-c: git commit",
    },
    {
      data: {
        command: "FzfPreviewGitStatus",
        type: "git-status",
        action: "header",
        file: "",
        status: "",
      },
      displayText: "<: Back actions, >: Select action",
    },
  ]

  const lines = [
    ...headers,
    ...statuses.map<ResourceLine>((line) => ({
      data: {
        command: "FzfPreviewGitStatus",
        type: "git-status",
        file: stripAnsi(line).split("").slice(3).join(""),
        status: stripAnsi(line).split("").slice(0, 2).join(""),
      },
      displayText: line.replace(/^\s/, "\xA0"),
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

export const gitStatusDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"GitStatus> "',
  "--multi": true,
  "--preview": `'${globalVariableSelector("fzfPreviewGitStatusPreviewCommand") as string}'`,
})

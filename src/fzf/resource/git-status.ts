import stripAnsi from "strip-ansi"

import { execGitStatus } from "@/connector/git"
import { isGitDirectory } from "@/connector/util"
import { colorizeFile } from "@/fzf/syntax/colorize"
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
    ...statuses.map<ResourceLine>(({ file, status }) => {
      return {
        data: {
          command: "FzfPreviewGitStatus",
          type: "git-status",
          file,
          status: stripAnsi(status),
        },
        displayText: `${status.replace(/^\s/, "\xA0")} ${colorizeFile(file)}`,
      }
    }),
  ]

  return {
    type: "json",
    lines,
  }
}

export const gitStatusDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"GitStatus> "',
  "--multi": true,
  "--preview": `'${globalVariableSelector("fzfPreviewGitStatusPreviewCommand") as string}'`,
  "--keep-right": true,
  "--header-lines": "2",
})

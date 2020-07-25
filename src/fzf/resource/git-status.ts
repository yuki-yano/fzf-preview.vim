import { execGitStatus } from "@/connector/git"
import { isGitDirectory } from "@/connector/util"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import type { FzfCommandDefinitionDefaultOption, Resource, SourceFuncArgs } from "@/type"

export const gitStatus = async (_args: SourceFuncArgs): Promise<Resource> => {
  if (!(await isGitDirectory())) {
    throw new Error("The current directory is not a git project")
  }

  const lines = await execGitStatus()

  /* eslint-disable no-control-regex */
  return {
    type: "json",
    lines: lines.map((line) => ({
      data: {
        command: "FzfPreviewGitStatus",
        type: "git-status",
        file: line
          .replace(/\x1b\[[0-9;]*m/g, "")
          .split("")
          .slice(3)
          .join(""),
        status: line
          .replace(/\x1b\[[0-9;]*m/g, "")
          .split("")
          .slice(0, 2)
          .join(""),
      },
      displayText: line.replace(/^\s/, "\xA0"),
    })),
  }
  /* eslint-enable no-control-regex */
}

export const gitStatusDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--header": '"Enter: Open, C-q: Back actions, C-a: git add, C-r: git reset, C-c: git add --patch"',
  "--prompt": '"GitStatus> "',
  "--multi": true,
  "--preview": `'${globalVariableSelector("fzfPreviewGitStatusPreviewCommand") as string}'`,
})

import { globalVariableSelector } from "@/module/selector/vim-variable"
import { execSyncCommand } from "@/system/command"
import { existsFileAsync, getCurrentFilePath } from "@/system/file"
import type { FzfCommandDefinitionDefaultOption, Resource, ResourceLines, SourceFuncArgs } from "@/type"

export const blamePr = async (_args: SourceFuncArgs): Promise<Resource> => {
  if (!(await existsFileAsync(await getCurrentFilePath()))) {
    return {
      type: "json",
      lines: [],
    }
  }

  const file = await getCurrentFilePath()
  const openPrCommand = globalVariableSelector("fzfPreviewBlamePrCommand") as string
  const { stdout, stderr, status } = execSyncCommand(`${openPrCommand} ${file}`)

  if (stderr !== "" || status !== 0) {
    throw new Error(`Failed open pr command: "${openPrCommand}"`)
  }

  const lines = stdout.split("\n").filter((line) => line !== "")
  const resourceLines: ResourceLines = lines.map((line) => {
    const result = /^PR\s#(?<prNumber>\d+)/.exec(line)
    if (result?.groups != null) {
      return {
        data: {
          command: "FzfPreviewBlamePR",
          type: "git-pr",
          prNumber: Number(result.groups.prNumber),
        },
        displayText: line,
      }
    }

    return {
      data: {
        command: "FzfPreviewBlamePR",
        type: "git-pr",
      },
      displayText: line,
    }
  })

  return {
    type: "json",
    lines: resourceLines,
  }
}

export const blamePrDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"Blame PR> "',
  "--multi": true,
  "--preview": '"gh pr view {3}"',
})

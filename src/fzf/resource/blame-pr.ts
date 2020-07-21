import { globalVariableSelector } from "@/module/selector/vim-variable"
import { execSyncCommand } from "@/system/command"
import { currentFilePath, existsFileAsync } from "@/system/file"
import type { FzfCommandDefinitionDefaultOption, Resource, SourceFuncArgs } from "@/type"

export const blamePr = async (_args: SourceFuncArgs): Promise<Resource> => {
  if (!(await existsFileAsync(await currentFilePath()))) {
    return { lines: [] }
  }

  const file = await currentFilePath()
  const openPrCommand = globalVariableSelector("fzfPreviewBlamePrCommand") as string
  const { stdout, stderr, status } = execSyncCommand(`${openPrCommand} ${file}`)

  if (stderr !== "" || status !== 0) {
    throw new Error(`Failed open pr command: "${openPrCommand}"`)
  }

  return { lines: stdout.split("\n").filter((line) => line !== "") }
}

export const blamePrDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"Blame PR> "',
  "--multi": true,
  "--preview": '"gh pr view {2}"',
})

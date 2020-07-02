import { logger } from "neovim/lib/utils/logger"

import { globalVariableSelector } from "@/module/selector/vim-variable"
import { execCommand } from "@/system/command"
import { currentFilePath, existsFile } from "@/system/file"
import type { FzfCommandDefinitionDefaultOption, ResourceLines, SourceFuncArgs } from "@/type"

export const blamePr = async (_args: SourceFuncArgs): Promise<ResourceLines> => {
  if (!existsFile(await currentFilePath())) {
    return []
  }

  const file = await currentFilePath()
  const openPrCommand = globalVariableSelector("fzfPreviewBlamePrCommand") as string
  const { stdout, stderr, status } = execCommand(`${openPrCommand} ${file}`)

  if (stderr !== "" || status !== 0) {
    logger.error(stderr)
    throw new Error(`Failed open pr command: "${openPrCommand}"`)
  }

  return stdout.split("\n").filter((line) => line !== "")
}

export const blamePrDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"Blame PR> "',
  "--multi": true,
  "--preview": '"gh pr view {2}"',
})

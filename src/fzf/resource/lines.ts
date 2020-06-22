import { logger } from "neovim/lib/utils/logger"

import { globalVariableSelector } from "@/module/selector/vim-variable"
import { execCommand } from "@/system/command"
import { currentFilePath, existsFile } from "@/system/file"
import type { FzfCommandDefinitionDefaultOption, ResourceLines, SourceFuncArgs } from "@/type"

export const lines = async (_args: SourceFuncArgs): Promise<ResourceLines> => {
  if (!existsFile(await currentFilePath())) {
    return []
  }

  const file = await currentFilePath()
  const linesCommand = globalVariableSelector("fzfPreviewLinesCommand") as string
  const { stdout, stderr, status } = execCommand(`${linesCommand} ${file}`)

  if (stderr !== "" || status !== 0) {
    logger.error(stderr)
    throw new Error(`Failed lines command: "${linesCommand}"`)
  }

  return stdout.split("\n")
}

const previewCommand = async () => {
  const grepPreviewCommand = globalVariableSelector("fzfPreviewGrepPreviewCmd") as string
  return `"${grepPreviewCommand} ${await currentFilePath()}:{1}"`
}

export const linesDefaultOptions = async (): Promise<FzfCommandDefinitionDefaultOption> => ({
  "--prompt": '"Lines> "',
  "--multi": true,
  "--preview": await previewCommand()
})

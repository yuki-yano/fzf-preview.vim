import { logger } from "neovim/lib/utils/logger"

import { createGlobalVariableSelector } from "@/module/vim-variable"
import { store } from "@/store"
import { execCommand } from "@/system/command"
import { currentFilePath, existsFile } from "@/system/file"
import type { SourceFuncArgs } from "@/type"

export const lines = async (_args: SourceFuncArgs) => {
  if (!existsFile(await currentFilePath())) {
    return []
  }

  const file = await currentFilePath()
  const linesCommand = createGlobalVariableSelector(store)("fzfPreviewLinesCommand") as string
  const { stdout, stderr, status } = execCommand(`${linesCommand} ${file}`)

  if (stderr !== "" || status !== 0) {
    logger.error(stderr)
    throw new Error(`Failed lines command: "${linesCommand}"`)
  }

  return stdout.split("\n")
}

const previewCommand = async () => {
  const grepPreviewCommand = createGlobalVariableSelector(store)("fzfPreviewGrepPreviewCmd")
  return `"${grepPreviewCommand} ${await currentFilePath()}:{1}"`
}

export const linesDefaultOptions = async () => ({
  "--prompt": '"Lines> "',
  "--multi": true,
  "--preview": await previewCommand()
})

import { logger } from "neovim/lib/utils/logger"

import { globalVariableSelector } from "@/module/selector/vim-variable"
import { execCommand } from "@/system/command"
import type { ResourceLines } from "@/type"

export const execGrep = (arg: string): ResourceLines => {
  const grepCommand = globalVariableSelector("fzfPreviewGrepCmd") as string
  const { stdout, stderr, status } = execCommand(`${grepCommand} ${arg}`)

  if (stderr !== "" || status !== 0) {
    logger.error(stderr)
    throw new Error(`Failed lines command: "${grepCommand} ${arg}"`)
  }

  return stdout.split("\n").filter((line) => line !== "")
}

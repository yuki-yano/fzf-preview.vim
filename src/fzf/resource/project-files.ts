import { logger } from "neovim/lib/utils/logger"

import { store, Store } from "@/store"
import { execCommand } from "@/util/system"
import { createGlobalVariableSelector } from "@/module/vim-variable"

export const projectFiles = (storeForSelector: Store = store) => {
  const selector = createGlobalVariableSelector(storeForSelector)
  const command = selector("fzfPreviewFilelistCommand")

  if (typeof command !== "string") {
    return []
  }

  const { stdout, stderr, status } = execCommand(command)

  if (stderr !== "" || status !== 0) {
    logger.error("Failed to get the file list")
    return []
  }

  return stdout.split("\n")
}

export const projectFilesDefaultOptions = (storeForSelector: Store = store) => ({
  "--prompt": '"ProjectFiles> "',
  "--multi": true,
  "--preview": `"${createGlobalVariableSelector(storeForSelector)("fzfPreviewCommand")}"`
})

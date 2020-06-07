import { logger } from "neovim/lib/utils/logger"

import { store, Store } from "@/store"
import { execCommand } from "@/util/system"
import { createGlobalVariableSelector } from "@/module/vim-variable"
import { pluginCall } from "@/plugin"

export const projectFiles = async (storeForSelector: Store = store) => {
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

  const files = stdout.split("\n").filter((file) => file !== "")

  const useDevIcons = selector("fzfPreviewUseDevIcons")
  if (useDevIcons || useDevIcons !== 0) {
    return (await pluginCall("fzf_preview#remote#converter#convert_for_fzf", [files])) as Promise<Array<string>>
  } else {
    return new Promise<Array<string>>((resolve) => {
      resolve(files)
    })
  }
}

export const projectFilesDefaultOptions = (storeForSelector: Store = store) => ({
  "--prompt": '"ProjectFiles> "',
  "--multi": true,
  "--preview": `"${createGlobalVariableSelector(storeForSelector)("fzfPreviewCommand")}"`
})

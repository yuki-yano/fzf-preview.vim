import { store } from "@/store"
import { execCommand } from "@/util/system"
import { createGlobalVariableSelector } from "@/module/vim-variable"

export const projectFiles = () => {
  const globalVariableSelector = createGlobalVariableSelector(store.getState())
  const command = globalVariableSelector("fzfPreviewFilelistCommand")

  if (typeof command !== "string") {
    return []
  }

  const { stdout, stderr, status } = execCommand(command)

  if (stderr === "" && status === 0) {
    return stdout.split("\n")
  }
  console.log("Failed to get the file list")
  return []
}

export const projectFilesDefaultOptions = () => {
  const globalVariableSelector = createGlobalVariableSelector(store.getState())
  return {
    "--prompt": '"ProjectFiles> "',
    "--multi": true,
    "--preview": `"${globalVariableSelector("fzfPreviewCommand")}"`
  }
}

import { globalVariableSelector } from "@/module/selector/vim-variable"
import { pluginCall } from "@/plugin"
import { execSyncCommand } from "@/system/command"
import type { ResourceLines } from "@/type"

export const execGitFiles = async (): Promise<ResourceLines> => {
  const gitFilesCommand = globalVariableSelector("fzfPreviewGitFilesCommand")
  if (typeof gitFilesCommand !== "string") {
    return []
  }

  const lines = (await pluginCall("fzf_preview#remote#resource#git_files#get", [gitFilesCommand])) as ResourceLines
  return lines
}

export const execGitStatus = async (): Promise<ResourceLines> => {
  const gitStatusCommand = globalVariableSelector("fzfPreviewGitStatusCommand")
  if (typeof gitStatusCommand !== "string") {
    return []
  }

  const lines = (await pluginCall("fzf_preview#remote#resource#git_status#get", [gitStatusCommand])) as ResourceLines
  return lines
}

export const gitAdd = (file: string): void => {
  const { stderr, status } = execSyncCommand(`git add ${file}`)

  if (stderr !== "" || status !== 0) {
    throw new Error(`Failed: git add ${file}`)
  }
}

export const gitReset = (file: string): void => {
  const { stderr, status } = execSyncCommand(`git reset ${file}`)

  if (stderr !== "" || status !== 0) {
    throw new Error(`Failed: git reset ${file}`)
  }
}

export const gitPatch = async (file: string): Promise<void> => {
  await pluginCall("fzf_preview#remote#consumer#git#patch", [file])
}

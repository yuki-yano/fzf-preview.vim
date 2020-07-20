import { globalVariableSelector } from "@/module/selector/vim-variable"
import { pluginCall } from "@/plugin"
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

export const gitAdd = async (file: string): Promise<void> => {
  await pluginCall("fzf_preview#remote#consumer#git#add", [file])
}

export const gitReset = async (file: string): Promise<void> => {
  await pluginCall("fzf_preview#remote#consumer#git#reset", [file])
}

export const gitPatch = async (file: string): Promise<void> => {
  await pluginCall("fzf_preview#remote#consumer#git#patch", [file])
}

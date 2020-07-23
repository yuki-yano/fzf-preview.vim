import { globalVariableSelector } from "@/module/selector/vim-variable"
import { pluginCall } from "@/plugin"

export const execGitFiles = async (): Promise<Array<string>> => {
  const gitFilesCommand = globalVariableSelector("fzfPreviewGitFilesCommand")
  if (typeof gitFilesCommand !== "string") {
    return []
  }

  const lines = (await pluginCall("fzf_preview#remote#resource#git_files#get", [gitFilesCommand])) as Array<string>
  return lines
}

export const execGitStatus = async (): Promise<Array<string>> => {
  const gitStatusCommand = globalVariableSelector("fzfPreviewGitStatusCommand")
  if (typeof gitStatusCommand !== "string") {
    return []
  }

  const lines = (await pluginCall("fzf_preview#remote#resource#git_status#get", [gitStatusCommand])) as Array<string>
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

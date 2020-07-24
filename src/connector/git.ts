import { GIT_BRANCH_COMMAND } from "@/const/git"
import { createGitLogCommand } from "@/fzf/util"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import { pluginCall } from "@/plugin"
import { currentFilePath } from "@/system/file"
import type { GitBranch, GitLog } from "@/type"

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

export const execGitBranch = async (): Promise<Array<GitBranch>> => {
  const lines = (await pluginCall("fzf_preview#remote#resource#util#exec_command", [GIT_BRANCH_COMMAND])) as Array<
    string
  >

  return lines.map((line) => {
    const [prefix, name, date, author] = line.split("    ")
    return {
      prefix,
      name,
      date,
      author,
    }
  })
}

export const execGitLog = async (options?: { currentFile: boolean }): Promise<Array<GitLog>> => {
  const command =
    options != null && options.currentFile === true
      ? createGitLogCommand(await currentFilePath())
      : createGitLogCommand()

  const lines = (await pluginCall("fzf_preview#remote#resource#util#exec_command", [command])) as Array<string>

  return lines.map((line) => {
    const [prefix, hash, date, author, comment] = line.split("    ")
    return {
      prefix,
      hash,
      date,
      author,
      comment,
    }
  })
}

export const gitAdd = async (file: string): Promise<void> => {
  await pluginCall("fzf_preview#remote#consumer#git#add", [file])
}

export const gitReset = async (file: string, option?: "--soft" | "--hard"): Promise<void> => {
  await pluginCall("fzf_preview#remote#consumer#git#reset", [file, option == null ? "" : option])
}

export const gitPatch = async (file: string): Promise<void> => {
  await pluginCall("fzf_preview#remote#consumer#git#patch", [file])
}

export const gitCheckout = async (branch: string): Promise<void> => {
  await pluginCall("fzf_preview#remote#consumer#git#checkout", [branch])
}

export const gitDiff = async (branch: string, branch2?: string): Promise<void> => {
  if (branch2 == null) {
    await pluginCall("fzf_preview#remote#consumer#git#diff", [branch])
  } else {
    await pluginCall("fzf_preview#remote#consumer#git#diff", [branch, branch2])
  }
}

export const gitShow = async (nameOrHash: string): Promise<void> => {
  await pluginCall("fzf_preview#remote#consumer#git#show", [nameOrHash])
}

export const gitYank = async (branchOrHash: string): Promise<void> => {
  await pluginCall("fzf_preview#remote#consumer#git#yank", [branchOrHash])
}

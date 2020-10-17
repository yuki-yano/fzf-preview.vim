import { GIT_BRANCH_COMMAND } from "@/const/git"
import {
  createGitLogCommand,
  gitReflogDecorateCommand,
  gitReflogNameCommand,
  gitStashDecorateCommand,
  gitStashNameCommand,
} from "@/fzf/util"
import { loadGitConfig } from "@/module/persist"
import { gitConfigSelector } from "@/module/selector/git-config"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import { pluginCall } from "@/plugin"
import { dispatch } from "@/store"
import { getCurrentFilePath } from "@/system/file"
import type { GitBranch, GitLog, GitReflog, GitStash } from "@/type"

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
    options?.currentFile === true ? createGitLogCommand(await getCurrentFilePath()) : createGitLogCommand()

  const lines = (await pluginCall("fzf_preview#remote#resource#util#exec_command", [command])) as Array<string>

  return lines.map((line) => {
    const [prefix, hash, date, author, comment] = line.split(/\s{4,}/)

    return {
      prefix,
      hash,
      date,
      author,
      comment,
    }
  })
}

export const execGitReflog = async (): Promise<Array<GitReflog>> => {
  const lines1 = (await pluginCall("fzf_preview#remote#resource#util#exec_command", [
    gitReflogDecorateCommand,
  ])) as Array<string>
  const lines2 = (await pluginCall("fzf_preview#remote#resource#util#exec_command", [gitReflogNameCommand])) as Array<
    string
  >

  return lines1.map((line, i) => {
    const [prefix, hash, date, author, comment] = line.split(/\s{4,}/)
    const name = lines2[i]

    return {
      prefix,
      name,
      hash,
      date,
      author,
      comment,
    }
  })
}

export const execGitStash = async (): Promise<Array<GitStash>> => {
  const lines1 = (await pluginCall("fzf_preview#remote#resource#util#exec_command", [
    gitStashDecorateCommand,
  ])) as Array<string>
  const lines2 = (await pluginCall("fzf_preview#remote#resource#util#exec_command", [gitStashNameCommand])) as Array<
    string
  >

  return lines1.map((line, i) => {
    const [prefix, hash, date, author, comment] = line.split(/\s{4,}/)
    const name = lines2[i]

    return {
      prefix,
      name,
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

type CommitOption =
  | { name: "--amend" }
  | { name: "--amend --no-edit" }
  | { name: "--squash"; hash: string }
  | { name: "--fixup"; hash: string }

export const gitCommit = async (option?: CommitOption): Promise<void> => {
  await dispatch(loadGitConfig())
  const noVerify = gitConfigSelector("noVerify")

  const addNoVerifyOption = (optionString: string) => (noVerify ? `${optionString} --no-verify` : optionString)

  if (option == null) {
    await pluginCall("fzf_preview#remote#consumer#git#commit", [addNoVerifyOption("")])
  } else if (option.name === "--amend" || option.name === "--amend --no-edit") {
    await pluginCall("fzf_preview#remote#consumer#git#commit", [addNoVerifyOption(option.name)])
  } else if (option.name === "--squash" || option.name === "--fixup") {
    await pluginCall("fzf_preview#remote#consumer#git#commit", [addNoVerifyOption(`${option.name} ${option.hash}`)])
  }
}

export const gitCheckout = async (branchOrFile: string): Promise<void> => {
  await pluginCall("fzf_preview#remote#consumer#git#checkout", [branchOrFile])
}

export const gitCreateBranch = async (): Promise<void> => {
  await pluginCall("fzf_preview#remote#consumer#git#create_branch")
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

export const gitPush = async (option?: string): Promise<void> => {
  await pluginCall("fzf_preview#remote#consumer#git#push", [option != null ? option : ""])
}

export const gitFetch = async (): Promise<void> => {
  await pluginCall("fzf_preview#remote#consumer#git#fetch")
}

export const gitPull = async (): Promise<void> => {
  await pluginCall("fzf_preview#remote#consumer#git#pull")
}

export const gitMerge = async (branch: string, option?: "--no-ff"): Promise<void> => {
  await pluginCall("fzf_preview#remote#consumer#git#merge", [branch, option != null ? option : ""])
}

export const gitRebase = async (branch: string): Promise<void> => {
  await pluginCall("fzf_preview#remote#consumer#git#rebase", [branch])
}

export const gitRebaseInteractive = async (branchOrHash: string): Promise<void> => {
  await pluginCall("fzf_preview#remote#consumer#git#rebase_interactive", [branchOrHash])
}

export const gitDeleteBranch = async (branch: string, option?: { name: "--force" }): Promise<void> => {
  await pluginCall("fzf_preview#remote#consumer#git#delete_branch", [branch, option != null ? option.name : ""])
}

export const gitRenameBranch = async (branch: string): Promise<void> => {
  await pluginCall("fzf_preview#remote#consumer#git#rename_branch", [branch])
}

export const gitStashApply = async (name: string): Promise<void> => {
  await pluginCall("fzf_preview#remote#consumer#git#stash_apply", [name])
}

export const gitStashPop = async (name: string): Promise<void> => {
  await pluginCall("fzf_preview#remote#consumer#git#stash_pop", [name])
}

export const gitStashDrop = async (name: string): Promise<void> => {
  await pluginCall("fzf_preview#remote#consumer#git#stash_drop", [name])
}

export const gitStashCreate = async (): Promise<void> => {
  await pluginCall("fzf_preview#remote#consumer#git#stash_create")
}

export const gitYank = async (branchOrHash: string): Promise<void> => {
  await pluginCall("fzf_preview#remote#consumer#git#yank", [branchOrHash])
}

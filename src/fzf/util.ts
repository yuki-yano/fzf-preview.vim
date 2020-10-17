import camelCase from "camelcase"

import { globalVariableSelector } from "@/module/selector/vim-variable"
import type { ProcessesName } from "@/type"

export const createProcessFunctionName = (processesName: ProcessesName, expectKey: string): string =>
  camelCase(`fzf-preview-${processesName}-${expectKey}`, { pascalCase: true })

export const filePreviewCommand = (): string => {
  const previewCommand = globalVariableSelector("fzfPreviewCommand") as string
  const binaryPreviewCommand = globalVariableSelector("fzfBinaryPreviewCommand") as string
  const ifBinaryCommand = globalVariableSelector("fzfPreviewIfBinaryCommand") as string

  return `'${ifBinaryCommand} && ${binaryPreviewCommand} || ${previewCommand}'`
}

const createGitLogAndStashOption = (prefix: string) => {
  return `--decorate --color=always --date=iso  --format='%C(green)[${prefix}]%Creset    %C(magenta)%h%Creset    %C(yellow)%ad %x09%Creset    [%C(blue)%an%Creset]    %x09%C(auto)%s'`
}

export const gitStashDecorateCommand = `git stash list ${createGitLogAndStashOption("stash")}`
export const gitStashNameCommand = `git stash list --decorate --color=always --format='%C(cyan)%gd%Creset'`

export const gitReflogDecorateCommand = `git reflog ${createGitLogAndStashOption("reflog")}`
export const gitReflogNameCommand = `git reflog --decorate --color=always --format='%C(cyan)%gd%Creset'`

export const createGitLogCommand = (file?: string): string => {
  const targetFile = file != null ? `-- ${file}` : ""

  return `git log ${createGitLogAndStashOption("commit")} ${targetFile}`
}

type ParsedQuickFix = {
  fileName: string
  lineNumber: number
  text: string
}

export const parseQuickFixAndLocationListLine = (line: string): ParsedQuickFix => {
  const result = /^(?<fileName>[^|]*)\|((?<lineNumber>\d+)( col (\d+))?[^|]*)?\|(?<text>.*)/.exec(line)

  if (result?.groups == null) {
    throw new Error(`line is not quickfix format: "${line}"`)
  }

  const { fileName, lineNumber, text } = result.groups

  return { fileName, lineNumber: Number(lineNumber), text }
}

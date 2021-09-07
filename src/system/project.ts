import { globalVariableSelector } from "@/module/selector/vim-variable"
import { execAsyncCommand } from "@/system/command"

export const dropFileProtocol = (uri: string): string => {
  const result = /file:\/\/(?<path>\S+)/.exec(uri)

  if (result?.groups != null) {
    return result.groups.path
  }

  return uri
}

export const filePathToRelativeFilePath = (file: string, currentPath: string): string | null => {
  const regex = new RegExp(`^${currentPath}/(?<fileName>.+)`)
  const execArray = regex.exec(file)

  if (execArray?.groups == null) {
    return null
  }

  return execArray.groups.fileName
}

export const filterProjectEnabledFile = async (
  files: ReadonlyArray<string>,
  currentPath: string
): Promise<ReadonlyArray<string>> => {
  const { stdout } = await execAsyncCommand(globalVariableSelector("fzfPreviewFilelistCommand") as string)
  const projectFiles = stdout.split("\n").map((file) => file.trim())

  const existsFiles = files
    .map((file) => filePathToRelativeFilePath(file, currentPath))
    .filter((file): file is string => projectFiles.some((projectFile) => file != null && projectFile === file))

  return existsFiles
}

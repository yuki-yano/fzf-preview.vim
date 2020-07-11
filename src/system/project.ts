import { IS_GIT_DIRECTORY_COMMAND } from "@/const/system"
import { execCommand } from "@/system/command"
import { existsFile } from "@/system/file"
import type { ResourceLines } from "@/type"

export const isGitDirectory = (): boolean => {
  const { status } = execCommand(IS_GIT_DIRECTORY_COMMAND)
  return typeof status === "number" && status === 0
}

const getProjectRoot = () => {
  if (!isGitDirectory()) {
    throw new Error("The current directory is not a git project")
  }

  const { stdout } = execCommand(IS_GIT_DIRECTORY_COMMAND)
  return stdout.trim()
}

const filePathToProjectFilePath = (filePath: string): string | null => {
  const regex = new RegExp(`^${getProjectRoot()}/(?<fileName>.+)`)
  const execArray = regex.exec(filePath)

  if (execArray == null || execArray.groups == null) {
    return null
  }

  return execArray.groups.fileName
}

export const filterProjectEnabledFile = (filePaths: ResourceLines): Array<string> =>
  filePaths
    .filter((file) => existsFile(file))
    .map((filePath) => filePathToProjectFilePath(filePath))
    .filter((filePath): filePath is string => filePath != null)

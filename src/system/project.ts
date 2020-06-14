import { IS_GIT_DIRECTORY_COMMAND } from "@/const/system"
import { execCommand } from "@/system/command"
import { existsFile } from "@/system/file"

export const isGitDirectory = () => {
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

export const projectRoot = getProjectRoot()

export const filePathToProjectFilePath = (filePath: string) => {
  const regex = new RegExp(`^${projectRoot}/(?<fileName>.+)`)
  const execArray = regex.exec(filePath)

  if (execArray === null || execArray.groups === undefined) {
    return null
  }

  return execArray.groups.fileName
}

export const filterProjectEnabledFile = (filePaths: Array<string>) =>
  filePaths
    .filter((file) => existsFile(file))
    .map((filePath) => filePathToProjectFilePath(filePath))
    .filter((filePath): filePath is string => filePath !== null)

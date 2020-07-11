import { IS_GIT_DIRECTORY_COMMAND } from "@/const/system"
import { cacheSelector } from "@/module/selector/cache"
import { execCommand } from "@/system/command"
import { existsFile } from "@/system/file"
import type { ResourceLines } from "@/type"

export const isGitDirectory = (): boolean => {
  const { status } = execCommand(IS_GIT_DIRECTORY_COMMAND)
  return typeof status === "number" && status === 0
}

export const getProjectRoot = (): string => {
  if (!isGitDirectory()) {
    return ""
  }

  const { stdout } = execCommand(IS_GIT_DIRECTORY_COMMAND)
  return stdout.trim()
}

const filePathToProjectFilePath = (filePath: string): string | null => {
  const { projectRoot } = cacheSelector()
  const regex = new RegExp(`^${projectRoot}/(?<fileName>.+)`)
  const execArray = regex.exec(filePath)

  if (execArray == null || execArray.groups == null) {
    return null
  }

  return execArray.groups.fileName
}

export const filterProjectEnabledFile = (filePaths: ResourceLines): Array<string> => {
  return filePaths
    .filter((file) => existsFile(file))
    .map((filePath) => filePathToProjectFilePath(filePath))
    .filter((filePath): filePath is string => filePath != null)
}

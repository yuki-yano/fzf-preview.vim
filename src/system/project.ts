import { getProjectRoot as execGetProjectRoot, isGitDirectory } from "@/connector/util"
import { cacheSelector } from "@/module/selector/cache"
import { existsFile } from "@/system/file"
import type { ResourceLines } from "@/type"
import { asyncFilter } from "@/util/array"

export const getProjectRoot = async (): Promise<string> => {
  if (!(await isGitDirectory())) {
    return ""
  }

  const projectRoot = await execGetProjectRoot()
  return projectRoot
}

export const dropFileProtocol = (uri: string): string => {
  const result = /file:\/\/(?<path>\S+)/.exec(uri)

  if (result && result.groups) {
    return result.groups.path
  }

  return uri
}

export const filePathToProjectFilePath = (filePath: string): string | null => {
  const { projectRoot } = cacheSelector()
  const regex = new RegExp(`^${projectRoot}/(?<fileName>.+)`)
  const execArray = regex.exec(filePath)

  if (execArray == null || execArray.groups == null) {
    return null
  }

  return execArray.groups.fileName
}

export const filterProjectEnabledFile = async (filePaths: ResourceLines): Promise<Array<string>> => {
  const existsFiles = await asyncFilter(filePaths, (file) => existsFile(file))
  return existsFiles
    .map((filePath) => filePathToProjectFilePath(filePath))
    .filter((filePath): filePath is string => filePath != null)
}

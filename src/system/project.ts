import { existsFileAsync, getCurrentPath } from "@/system/file"
import { asyncFilter } from "@/util/array"

export const dropFileProtocol = (uri: string): string => {
  const result = /file:\/\/(?<path>\S+)/.exec(uri)

  if (result && result.groups) {
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

export const filterProjectEnabledFile = async (files: Array<string>): Promise<Array<string>> => {
  const existsFiles = await asyncFilter(files, (file) => existsFileAsync(file))
  const currentPath = await getCurrentPath()

  return existsFiles
    .map((file) => filePathToRelativeFilePath(file, currentPath))
    .filter((file): file is string => file != null)
}

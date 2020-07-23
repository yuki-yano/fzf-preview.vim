import { cacheSelector } from "@/module/selector/cache"
import { existsFileAsync } from "@/system/file"
import { asyncFilter } from "@/util/array"

export const dropFileProtocol = (uri: string): string => {
  const result = /file:\/\/(?<path>\S+)/.exec(uri)

  if (result && result.groups) {
    return result.groups.path
  }

  return uri
}

export const filePathToProjectFilePath = (file: string): string | null => {
  const { projectRoot } = cacheSelector()
  const regex = new RegExp(`^${projectRoot}/(?<fileName>.+)`)
  const execArray = regex.exec(file)

  if (execArray == null || execArray.groups == null) {
    return null
  }

  return execArray.groups.fileName
}

export const filterProjectEnabledFile = async (files: Array<string>): Promise<Array<string>> => {
  const existsFiles = await asyncFilter(files, (file) => existsFileAsync(file))
  return existsFiles.map((file) => filePathToProjectFilePath(file)).filter((file): file is string => file != null)
}

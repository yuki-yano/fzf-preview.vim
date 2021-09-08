import { execProjectFiles } from "@/connector/project-files"
import { filePathModule } from "@/module/file-path"
import { filePathSelector } from "@/module/selector/file-path"
import { dispatch } from "@/store"

export const dropFileProtocol = (uri: string): string => {
  const result = /file:\/\/(?<path>\S+)/.exec(uri)

  if (result?.groups != null) {
    return result.groups.path
  }

  return uri
}

export const filePathToRelativeFilePath = (file: string, currentPath: string): string | null => {
  const cachedPath: ReturnType<typeof filePathSelector> | undefined = filePathSelector(file)

  if (cachedPath?.relativePath != null) {
    return cachedPath.relativePath
  }

  const regex = new RegExp(`^${currentPath}/(?<fileName>.+)`)
  const regExpExecArray = regex.exec(file)

  if (regExpExecArray?.groups == null) {
    return null
  }

  const relativePath = regExpExecArray.groups.fileName
  dispatch(filePathModule.actions.registerRelativePath({ absolutePath: file, relativePath }))

  return relativePath
}

export const filterProjectEnabledFile = async (
  files: ReadonlyArray<string>,
  currentPath: string
): Promise<ReadonlyArray<string>> => {
  const projectFiles = await execProjectFiles()
  const existsFiles = files
    .map((file) => filePathToRelativeFilePath(file, currentPath))
    .filter((file): file is string => projectFiles.some((projectFile) => file != null && projectFile === file))

  return existsFiles
}

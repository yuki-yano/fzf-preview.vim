import fs from "fs"

import { globalVariableSelector } from "@/module/selector/vim-variable"
import { existsDirectory, expandHome } from "@/system/file"

const cacheDirectory = () => {
  const cacheDir = globalVariableSelector("fzfPreviewCacheDirectory")

  if (typeof cacheDir !== "string" || cacheDir === "") {
    throw new Error("g:fzf_preview_cache_directory must be string")
  }

  return cacheDir
}

const readFileOrCreateDirectory = (cacheFile: string) => {
  const cacheDirectoryPath = expandHome(cacheDirectory())
  if (!existsDirectory(cacheDirectoryPath)) {
    fs.mkdirSync(cacheDirectoryPath, { recursive: true })
  }

  try {
    return fs.readFileSync(cacheFile).toString().split("\n")
  } catch (_error) {
    return []
  }
}

const mruFilePath = () => `${cacheDirectory()}/mru`
const mrwFilePath = () => `${cacheDirectory()}/mrw`

const readFile = (filePath: string) => {
  const files = readFileOrCreateDirectory(filePath)

  return files
}

export const readMruFile = (): Array<string> => {
  const files = readFile(mruFilePath())

  return files
}
export const readMrwFile = (): Array<string> => {
  const files = readFile(mrwFilePath())

  return files
}

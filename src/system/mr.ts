import fs from "fs"

import { globalVariableSelector } from "@/module/selector/vim-variable"
import { execAsyncCommand } from "@/system/command"
import { existsDirectory, expandHome } from "@/system/file"

const cacheDirectory = () => {
  const cacheDir = globalVariableSelector("fzfPreviewCacheDirectory")

  if (typeof cacheDir !== "string" || cacheDir === "") {
    throw new Error("g:fzf_preview_cache_directory must be string")
  }

  return cacheDir
}

const readFileOrCreateDirectory = async (cacheFile: string) => {
  const cacheDirectoryPath = expandHome(cacheDirectory())
  if (!existsDirectory(cacheDirectoryPath)) {
    fs.mkdirSync(cacheDirectoryPath, { recursive: true })
  }

  try {
    const { stdout: files } = await execAsyncCommand(`cat ${cacheFile}`)

    return files.split("\n")
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

export const readMruFile = async (): Promise<ReadonlyArray<string>> => {
  const files = await readFile(mruFilePath())

  return files
}
export const readMrwFile = async (): Promise<ReadonlyArray<string>> => {
  const files = await readFile(mrwFilePath())

  return files
}

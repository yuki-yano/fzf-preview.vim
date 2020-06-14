import fs from "fs"

import { createGlobalVariableSelector } from "@/module/vim-variable"
import { syncVimVariable } from "@/plugin/sync-vim-variable"
import { store } from "@/store"
import { existsDirectory, expandHome } from "@/system/file"

const cacheDirectory = async () => {
  // TODO: Reduce the number of sync executions
  await syncVimVariable()
  const cacheDir = createGlobalVariableSelector(store)("fzfPreviewCacheDirectory")

  if (typeof cacheDir !== "string" || cacheDir === "") {
    throw new Error("g:fzf_preview_cache_directory must be string")
  }

  return cacheDir
}

const readFileOrCreateDirectory = async (cacheFile: string) => {
  const cacheDirectoryPath = expandHome(await cacheDirectory())
  if (!existsDirectory(cacheDirectoryPath)) {
    fs.mkdirSync(cacheDirectoryPath, { recursive: true })
  }

  try {
    return fs.readFileSync(cacheFile).toString().split("\n")
  } catch (_error) {
    return []
  }
}

const mruFilePath = async () => `${await cacheDirectory()}/mru`
const mrwFilePath = async () => `${await cacheDirectory()}/mrw`

const readFile = async (filePath: string) => {
  const files = await readFileOrCreateDirectory(filePath)
  return files
}

export const readMruFile = async () => {
  const files = await readFile(await mruFilePath())
  return files
}
export const readMrwFile = async () => {
  const files = await readFile(await mrwFilePath())
  return files
}

const appendFile = async (filePath: string, cacheFilePath: string) => {
  const files = await readFileOrCreateDirectory(cacheFilePath)

  files.unshift(filePath)
  const uniqFiles = Array.from(new Set(files.filter((file) => file !== "")))
  fs.writeFileSync(cacheFilePath, uniqFiles.join("\n"))
}

export const appendMruFile = async (filePath: string) => appendFile(filePath, await mruFilePath())
export const appendMrwFile = async (filePath: string) => appendFile(filePath, await mrwFilePath())

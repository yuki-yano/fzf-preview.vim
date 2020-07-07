import fs from "fs"
import path from "path"

import { pluginCall } from "@/plugin"

export const expandHome = (filePath: string): string => {
  if (filePath.startsWith("~")) {
    return path.join(process.env.HOME as string, filePath.slice(1))
  }
  return filePath
}

export const existsFile = (filePath: string): boolean => {
  try {
    const stats = fs.statSync(filePath)
    return stats.isFile()
  } catch (_error) {
    return false
  }
}

export const existsDirectory = (dirPath: string): boolean => {
  try {
    const stats = fs.statSync(dirPath)
    return stats.isDirectory()
  } catch (_error) {
    return false
  }
}

export const readFile = (filePath: string): string => {
  return fs.readFileSync(filePath, { encoding: "utf-8" })
}

export const currentFilePath = async (): Promise<string> => {
  const file = (await pluginCall("expand", "%")) as string
  return file
}

import fs from "fs"
import path from "path"

import { pluginCall } from "@/plugin"

export const expandHome = (filePath: string) => {
  if (filePath.startsWith("~")) {
    return path.join(process.env.HOME as string, filePath.slice(1))
  }
  return filePath
}

export const existsFile = (filePath: string) => {
  try {
    const stats = fs.statSync(filePath)
    return stats.isFile()
  } catch (_error) {
    return null
  }
}

export const existsDirectory = (dirPath: string) => {
  try {
    const stats = fs.statSync(dirPath)
    return stats.isDirectory()
  } catch (_error) {
    return null
  }
}

export const currentFilePath = async () => {
  const file = (await pluginCall("expand", "%")) as string
  return file
}

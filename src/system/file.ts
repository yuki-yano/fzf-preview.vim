import fs from "fs"
import path from "path"

import { TEMPORALLY_DATA_FILE_PATH } from "@/const/system"
import { pluginCall } from "@/plugin"

export const expandHome = (filePath: string): string => {
  if (filePath.startsWith("~")) {
    return path.join(process.env.HOME as string, filePath.slice(1))
  }

  return filePath
}

export const collapseHome = (filePath: string): string => {
  return filePath.replace(process.env.HOME as string, "~")
}

export const existsFileAsync = async (filePath: string): Promise<boolean> => {
  const result = (await pluginCall("filereadable", [filePath])) as number
  if (result === 0) {
    return false
  } else {
    return true
  }
}

// TODO: Use Vim script
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

export const readFileLine = (filePath: string, lineNumber: number): string => {
  return readFile(filePath).split("\n")[lineNumber - 1]
}

export const getCurrentFilePath = async (): Promise<string> => {
  const file = (await pluginCall("expand", "%")) as string

  return file
}

export const getCurrentPath = async (): Promise<string> => {
  const pwd = (await pluginCall("getcwd")) as string

  return pwd
}

export const initializeDataTransferFile = (filePath: string): void => {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath)
  }
  fs.closeSync(fs.openSync(TEMPORALLY_DATA_FILE_PATH, "w"))
}

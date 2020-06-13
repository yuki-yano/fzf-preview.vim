import fs from "fs"

export const existsFile = (filePath: string) => {
  try {
    const stats = fs.statSync(filePath)
    return stats.isFile()
  } catch (_error) {
    return null
  }
}

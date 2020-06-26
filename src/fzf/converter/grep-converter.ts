import type { ConvertedLine, SelectedLine } from "@/type"

export const convertGrepToFileAndText = (line: SelectedLine): ConvertedLine => {
  const [filePath, lineNumber, ...text] = line.trim().split(":")

  return `${filePath}:${lineNumber}:${text.join(":")}`
}

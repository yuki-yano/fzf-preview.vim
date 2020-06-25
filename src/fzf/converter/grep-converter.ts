import type { ConvertedLine, SelectedLine } from "@/type"

export const convertGrepToFileAndText = (line: SelectedLine): ConvertedLine => {
  const [filePathAndLineNumber] = line.trim().split(" ")
  const [filePath, lineNumber] = filePathAndLineNumber.split(":")
  const text = line.trim().split(" ").slice(1)

  return `${filePath}:${lineNumber} ${text.join(" ")}`
}

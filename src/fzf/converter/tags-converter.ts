import type { ConvertedLine, SelectedLine } from "@/type"

export const convertTags = (line: SelectedLine): ConvertedLine => {
  const arr = line.split(" ")
  const [file] = arr.slice(-1)
  const lineNumber = arr[0]
  const text = arr.slice(1, -1).join(" ")

  return `${file}:${lineNumber}:${text}`
}

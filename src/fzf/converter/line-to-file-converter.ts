import { executeCommandSelector } from "@/module/selector/execute-command"
import type { ConvertedLine, SelectedLine } from "@/type"

export const convertLineToFileAndText = (line: SelectedLine): ConvertedLine => {
  const { currentFilePath } = executeCommandSelector().options

  const [lineNumber, ...text] = line.trim().split(" ")
  return `${currentFilePath}:${lineNumber}:${text.join(" ")}`
}

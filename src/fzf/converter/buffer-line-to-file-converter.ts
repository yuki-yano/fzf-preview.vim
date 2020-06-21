import { executeCommandSelector } from "@/module/selector/execute-command"
import type { SelectedLine } from "@/type"

export const convertBufferLineToFileAndText = (line: SelectedLine) => {
  const { currentFilePath } = executeCommandSelector().options

  const [lineNumber, ...text] = line.trim().split(" ")
  return `${currentFilePath}:${lineNumber} ${text.join(" ")}`
}

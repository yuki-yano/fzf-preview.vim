import { executeCommandSelector } from "@/module/selector/execute-command"
import type { SelectedLine } from "@/type"

export const convertBufferLineToFile = (line: SelectedLine) => {
  const { currentFilePath } = executeCommandSelector().options

  const lineNumber = line.trim().split(" ")[0]
  return `${currentFilePath}:${lineNumber}`
}

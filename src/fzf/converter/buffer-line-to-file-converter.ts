import { createExecuteCommandSelector } from "@/module/execute-command"
import { store } from "@/store"
import type { SelectedLine } from "@/type"

export const convertBufferLineToFile = (line: SelectedLine) => {
  const executeCommandSelector = createExecuteCommandSelector(store)
  const { currentFilePath } = executeCommandSelector().options

  const lineNumber = line.trim().split(" ")[0]
  return `${currentFilePath}:${lineNumber}`
}

import { createSingleLineConsumer } from "@/fzf/process/consumer/consumer"
import { pluginCall, pluginCommand } from "@/plugin"
import type { OpenCommand, SelectedLine } from "@/type"

const splitSelectedLineToFileNameAndLineNumber = (selectedLine: SelectedLine) => {
  const result = /(?<fileName>\S+):(?<lineNumber>\d+)/.exec(selectedLine)

  if (!result || !result.groups) {
    return null
  }

  return {
    fileName: result.groups.fileName,
    lineNumber: result.groups.lineNumber
  }
}

const createOpenFileConsumer = (openCommand: OpenCommand) =>
  createSingleLineConsumer(async (selectedLine) => {
    const fileNameAndLineNumber = splitSelectedLineToFileNameAndLineNumber(selectedLine)
    if (!fileNameAndLineNumber) {
      await pluginCommand(`execute 'silent ${openCommand} ${selectedLine}'`)
    } else {
      const { fileName, lineNumber } = fileNameAndLineNumber
      await pluginCommand(`execute 'silent ${openCommand} ${fileName}'`)
      await pluginCall("cursor", [lineNumber, 0])
    }
  })

export const editConsumer = createOpenFileConsumer("edit")
export const splitConsumer = createOpenFileConsumer("split")
export const vsplitConsumer = createOpenFileConsumer("vsplit")
export const tabeditConsumer = createOpenFileConsumer("tabedit")

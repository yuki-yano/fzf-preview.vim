import { exportQuickFix, openFile } from "@/connector/open-file"
import { createBulkLineConsumer, createSingleLineConsumer } from "@/fzf/process/consumer"
import { executeCommandSelector } from "@/module/selector/execute-command"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import type { ExportQuickFix, OpenCommand } from "@/type"

const convertOpenCommand = (openCommand: OpenCommand): OpenCommand => {
  if (openCommand === "edit" && globalVariableSelector("fzfPreviewBuffersJump") !== 0) {
    return "drop"
  }

  return openCommand
}

const createOpenFileConsumer = (openCommand: OpenCommand) =>
  createSingleLineConsumer(async (data) => {
    const command = convertOpenCommand(openCommand)

    switch (data.type) {
      case "file": {
        await openFile({
          openCommand: command,
          file: data.file,
        })
        break
      }
      case "buffer": {
        await openFile({
          openCommand: command,
          file: data.file,
        })
        break
      }
      case "line": {
        await openFile({
          openCommand: command,
          file: data.file,
          lineNumber: data.lineNumber,
        })
        break
      }
      case "git-status": {
        await openFile({
          openCommand: command,
          file: data.file,
        })
        break
      }
      default: {
        throw new Error(`Unexpected data type: ${data.type}`)
      }
    }
  })

export const editConsumer = createOpenFileConsumer("edit")
export const splitConsumer = createOpenFileConsumer("split")
export const vsplitConsumer = createOpenFileConsumer("vsplit")
export const tabeditConsumer = createOpenFileConsumer("tabedit")
export const dropConsumer = createOpenFileConsumer("drop")

export const exportQuickfixConsumer = createBulkLineConsumer(async (dataList) => {
  const quickFixList: Array<ExportQuickFix> = dataList.map((data) => {
    switch (data.type) {
      case "file": {
        return {
          filename: data.file,
        }
      }
      case "buffer": {
        return {
          filename: data.file,
        }
      }
      case "line": {
        return {
          filename: data.file,
          lnum: data.lineNumber,
          text: data.text,
        }
      }
      case "git-status": {
        return {
          filename: data.file,
        }
      }
      default: {
        throw new Error(`Unexpected data type: ${data.type}`)
      }
    }
  })

  const title = executeCommandSelector().commandName as string
  await exportQuickFix(quickFixList, { title })
})

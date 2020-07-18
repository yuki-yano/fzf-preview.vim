import { deleteBuffer } from "@/connector/buffers"
import { openFile } from "@/connector/open-file"
import { createSingleLineConsumer } from "@/fzf/process/consumer/consumer"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import type { OpenCommand, OpenFile } from "@/type"

const convertOpenCommand = (openCommand: OpenCommand): OpenCommand => {
  if (openCommand === "edit" && globalVariableSelector("fzfPreviewBuffersJump") !== 0) {
    return "drop"
  }
  return openCommand
}

const createOpenBufferConsumer = (openCommand: OpenCommand) =>
  createSingleLineConsumer(async (convertedLine) => {
    const file = convertedLine.split(" ").pop() as string
    const openFileFormat: OpenFile = {
      openCommand: convertOpenCommand(openCommand),
      file,
    }

    await openFile(openFileFormat)
  })

const createDeleteBufferConsumer = () =>
  createSingleLineConsumer(async (convertedLine) => {
    const result = /^\[(?<bufnr>\d+)\]/.exec(convertedLine)

    if (result && result.groups) {
      const { bufnr } = result.groups
      await deleteBuffer(bufnr)
    }
  })

export const editConsumer = createOpenBufferConsumer("edit")
export const splitConsumer = createOpenBufferConsumer("split")
export const vsplitConsumer = createOpenBufferConsumer("vsplit")
export const tabeditConsumer = createOpenBufferConsumer("tabedit")
export const dropConsumer = createOpenBufferConsumer("drop")
export const deleteBufferConsumer = createDeleteBufferConsumer()

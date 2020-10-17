import { deleteBuffer } from "@/connector/buffers"
import { openFile } from "@/connector/open-file"
import { createSingleLineConsumer } from "@/fzf/process/consumer"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import type { OpenCommand, OpenFile, SingleLineConsumer } from "@/type"

const convertOpenCommand = (openCommand: OpenCommand): OpenCommand => {
  if (openCommand === "edit" && globalVariableSelector("fzfPreviewBuffersJump") !== 0) {
    return "drop"
  }

  return openCommand
}

const createOpenBufferConsumer = (openCommand: OpenCommand) =>
  createSingleLineConsumer(async (data) => {
    if (data.type !== "buffer") {
      throw new Error(`Unexpected data type: ${data.type}`)
    }

    const openFileFormat: OpenFile = {
      openCommand: convertOpenCommand(openCommand),
      file: data.file,
    }

    await openFile(openFileFormat)
  })

export const createDeleteBufferConsumer = (): SingleLineConsumer =>
  createSingleLineConsumer(async (data) => {
    if (data.type !== "buffer") {
      throw new Error(`Unexpected data type: ${data.type}`)
    }

    await deleteBuffer(data.bufnr.toString())
  })

export const editConsumer = createOpenBufferConsumer("edit")
export const splitConsumer = createOpenBufferConsumer("split")
export const vsplitConsumer = createOpenBufferConsumer("vsplit")
export const tabeditConsumer = createOpenBufferConsumer("tabedit")
export const dropConsumer = createOpenBufferConsumer("drop")
export const deleteBufferConsumer = createDeleteBufferConsumer()

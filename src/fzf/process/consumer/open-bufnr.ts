import { openBufnr } from "@/connector/open-bufnr"
import { createSingleLineConsumer } from "@/fzf/process/consumer"
import { createDeleteBufferConsumer } from "@/fzf/process/consumer/open-buffer"
import type { OpenCommand } from "@/type"

const createOpenBufnrConsumer = (openCommand: OpenCommand) =>
  createSingleLineConsumer(async (data) => {
    if (data.type !== "buffer") {
      throw new Error(`Unexpected data type: ${data.type}`)
    }
    await openBufnr(openCommand, data.bufnr.toString())
  })

export const editBufnrConsumer = createOpenBufnrConsumer("edit")
export const splitBufnrConsumer = createOpenBufnrConsumer("split")
export const vsplitBufnrConsumer = createOpenBufnrConsumer("vsplit")
export const tabeditBufnrConsumer = createOpenBufnrConsumer("tabedit")
export const deleteBufnrConsumer = createDeleteBufferConsumer()

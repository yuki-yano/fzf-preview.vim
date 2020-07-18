import { openBufnr } from "@/connector/open-bufnr"
import { createSingleLineConsumer } from "@/fzf/process/consumer/consumer"
import { createDeleteBufferConsumer } from "@/fzf/process/consumer/open-buffer"
import type { OpenCommand } from "@/type"

const createOpenBufnrConsumer = (openCommand: OpenCommand) =>
  createSingleLineConsumer(async (convertedLine) => {
    const result = /^\[(?<bufnr>\d+)\]/.exec(convertedLine)

    if (result != null && result.groups != null) {
      await openBufnr(openCommand, result.groups.bufnr)
    }
  })

export const editBufnrConsumer = createOpenBufnrConsumer("edit")
export const splitBufnrConsumer = createOpenBufnrConsumer("split")
export const vsplitBufnrConsumer = createOpenBufnrConsumer("vsplit")
export const tabeditBufnrConsumer = createOpenBufnrConsumer("tabedit")
export const deleteBufnrConsumer = createDeleteBufferConsumer()

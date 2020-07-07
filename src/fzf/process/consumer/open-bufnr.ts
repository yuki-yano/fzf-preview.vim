import { openBufnr } from "@/connector/open-buffer"
import { createSingleLineConsumer } from "@/fzf/process/consumer/consumer"
import type { OpenCommand } from "@/type"

const createOpenBufnrConsumer = (openCommand: OpenCommand) =>
  createSingleLineConsumer(async (convertedLine) => {
    const result = /^buffer (?<bufnr>\d+)/.exec(convertedLine)
    if (result != null && result.groups != null) {
      await openBufnr(openCommand, Number(result.groups.bufnr))
    }
  })

export const editBufnrConsumer = createOpenBufnrConsumer("edit")
export const splitBufnrConsumer = createOpenBufnrConsumer("split")
export const vsplitBufnrConsumer = createOpenBufnrConsumer("vsplit")
export const tabeditBufnrConsumer = createOpenBufnrConsumer("tabedit")

import { createSingleLineConsumer } from "@/fzf/process/consumer/consumer"
import { pluginCommand } from "@/plugin"
import type { OpenCommand } from "@/type"

const createOpenFileConsumer = (openCommand: OpenCommand) =>
  createSingleLineConsumer(async (line) => {
    await pluginCommand(`execute 'silent ${openCommand} ${line}'`)
  })

export const editConsumer = createOpenFileConsumer("edit")
export const splitConsumer = createOpenFileConsumer("split")
export const vsplitConsumer = createOpenFileConsumer("vsplit")
export const tabeditConsumer = createOpenFileConsumer("tabedit")

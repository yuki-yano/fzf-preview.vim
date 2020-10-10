import { editVimCommand, execVimCommand } from "@/connector/vim-command"
import { createSingleLineConsumer } from "@/fzf/process/consumer"

export const execCommandPaletteConsumer = createSingleLineConsumer(async (data) => {
  if (data.type !== "command-palette") {
    throw new Error(`Unexpected data type: ${data.type}`)
  }

  await execVimCommand(data.name)
})

export const editCommandPaletteConsumer = createSingleLineConsumer(async (data) => {
  if (data.type !== "command-palette") {
    throw new Error(`Unexpected data type: ${data.type}`)
  }

  await editVimCommand(data.name)
})

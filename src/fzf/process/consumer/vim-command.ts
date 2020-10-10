import { editVimCommand, execVimCommand } from "@/connector/vim-command"
import { createSingleLineConsumer } from "@/fzf/process/consumer"

export const execVimCommandConsumer = createSingleLineConsumer(async (data) => {
  if (data.type !== "vim-command") {
    throw new Error(`Unexpected data type: ${data.type}`)
  }

  await execVimCommand(data.name)
})

export const editVimCommandConsumer = createSingleLineConsumer(async (data) => {
  if (data.type !== "vim-command") {
    throw new Error(`Unexpected data type: ${data.type}`)
  }

  await editVimCommand(data.name)
})

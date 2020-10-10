import { editVimCommandConsumer, execVimCommandConsumer } from "@/fzf/process/consumer/vim-command"
import { createProcessCreator } from "@/fzf/process/process"
import type { Processes } from "@/type"

const createVimCommandProcess = createProcessCreator("vim-command")

export const vimCommandProcesses: Processes = [
  createVimCommandProcess("enter", execVimCommandConsumer),
  createVimCommandProcess("ctrl-e", editVimCommandConsumer),
]

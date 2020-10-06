import {
  deleteBufferConsumer,
  dropConsumer,
  editConsumer,
  splitConsumer,
  tabeditConsumer,
  vsplitConsumer,
} from "@/fzf/process/consumer/open-buffer"
import { createProcessCreator } from "@/fzf/process/process"
import type { Processes } from "@/type"

const createOpenBufferProcess = createProcessCreator("open-buffer")

export const openBufferProcesses: Processes = [
  createOpenBufferProcess("enter", editConsumer),
  createOpenBufferProcess("ctrl-x", splitConsumer),
  createOpenBufferProcess("ctrl-v", vsplitConsumer),
  createOpenBufferProcess("ctrl-t", tabeditConsumer),
  createOpenBufferProcess("ctrl-o", dropConsumer),
  createOpenBufferProcess("ctrl-q", deleteBufferConsumer),
]

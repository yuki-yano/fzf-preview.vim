import {
  editBufnrConsumer,
  splitBufnrConsumer,
  tabeditBufnrConsumer,
  vsplitBufnrConsumer,
} from "@/fzf/process/consumer"
import { createProcess } from "@/fzf/process/process"
import type { Processes } from "@/type"

const createOpenBufnrProcess = createProcess("open-bufnr")

export const openBufnrProcesses: Processes = [
  createOpenBufnrProcess("enter", editBufnrConsumer),
  createOpenBufnrProcess("ctrl-x", splitBufnrConsumer),
  createOpenBufnrProcess("ctrl-v", vsplitBufnrConsumer),
  createOpenBufnrProcess("ctrl-t", tabeditBufnrConsumer),
]

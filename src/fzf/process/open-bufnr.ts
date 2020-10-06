import {
  deleteBufnrConsumer,
  editBufnrConsumer,
  splitBufnrConsumer,
  tabeditBufnrConsumer,
  vsplitBufnrConsumer,
} from "@/fzf/process/consumer/open-bufnr"
import { createProcessCreator } from "@/fzf/process/process"
import type { Processes } from "@/type"

const createOpenBufnrProcess = createProcessCreator("open-bufnr")

export const openBufnrProcesses: Processes = [
  createOpenBufnrProcess("enter", editBufnrConsumer),
  createOpenBufnrProcess("ctrl-x", splitBufnrConsumer),
  createOpenBufnrProcess("ctrl-v", vsplitBufnrConsumer),
  createOpenBufnrProcess("ctrl-t", tabeditBufnrConsumer),
  createOpenBufnrProcess("ctrl-q", deleteBufnrConsumer),
]

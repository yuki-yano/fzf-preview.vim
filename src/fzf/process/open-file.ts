import {
  dropConsumer,
  editConsumer,
  exportQuickfixConsumer,
  splitConsumer,
  tabeditConsumer,
  vsplitConsumer,
} from "@/fzf/process/consumer/open-file"
import { createProcess } from "@/fzf/process/process"
import type { Processes } from "@/type"

const createOpenFileProcess = createProcess("open-file")

export const openFileProcesses: Processes = [
  createOpenFileProcess("enter", editConsumer),
  createOpenFileProcess("ctrl-x", splitConsumer),
  createOpenFileProcess("ctrl-v", vsplitConsumer),
  createOpenFileProcess("ctrl-t", tabeditConsumer),
  createOpenFileProcess("ctrl-o", dropConsumer),
  createOpenFileProcess("ctrl-q", exportQuickfixConsumer),
]

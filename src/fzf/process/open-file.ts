import {
  dropConsumer,
  editConsumer,
  exportQuickfixConsumer,
  splitConsumer,
  tabeditConsumer,
  vsplitConsumer,
} from "@/fzf/process/consumer/open-file"
import { createProcessCreator } from "@/fzf/process/process"
import type { Processes } from "@/type"

const createOpenFileProcess = createProcessCreator("open-file")

export const openFileProcesses: Processes = [
  createOpenFileProcess("enter", editConsumer),
  createOpenFileProcess("ctrl-x", splitConsumer),
  createOpenFileProcess("ctrl-v", vsplitConsumer),
  createOpenFileProcess("ctrl-t", tabeditConsumer),
  createOpenFileProcess("ctrl-o", dropConsumer),
  createOpenFileProcess("ctrl-q", exportQuickfixConsumer),
]

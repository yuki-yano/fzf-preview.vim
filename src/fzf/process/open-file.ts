import {
  editConsumer,
  exportQuickfixConsumer,
  splitConsumer,
  tabeditConsumer,
  vsplitConsumer
} from "@/fzf/process/consumer"
import { createProcess } from "@/fzf/process/process"
import type { Processes } from "@/type"

export const openFileProcesses: Processes = {
  "": createProcess(editConsumer),
  "ctrl-x": createProcess(splitConsumer),
  "ctrl-v": createProcess(vsplitConsumer),
  "ctrl-t": createProcess(tabeditConsumer),
  "ctrl-q": createProcess(exportQuickfixConsumer)
}

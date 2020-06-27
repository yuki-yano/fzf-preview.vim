import { openFileProcesses } from "@/fzf/process/open-file"
import type { ProcessesDefinition } from "@/type"

export const processesDefinition: ProcessesDefinition = [
  {
    name: "open-file",
    processes: openFileProcesses
  }
]

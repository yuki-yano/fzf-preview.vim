import { openFileProcesses } from "@/fzf/process/open-file"
import { registerProcesses } from "@/fzf/process/register"
import type { ProcessesDefinition } from "@/type"

export const processesDefinition: ProcessesDefinition = [
  {
    name: "open-file",
    processes: openFileProcesses,
  },
  {
    name: "register",
    processes: registerProcesses,
  },
]

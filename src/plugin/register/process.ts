import { processesDefinition } from "@/fzf/process"
import { pluginRegisterFunction } from "@/plugin"

export const registerProcesses = (): void => {
  processesDefinition.forEach(({ processes }) => {
    processes.forEach((process) => {
      pluginRegisterFunction(process.name, process.execute, { sync: false })
    })
  })
}

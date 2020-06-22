import { commandDefinition } from "@/association/command"
import { createProcessesFunctionName } from "@/fzf/process"
import { pluginRegisterFunction } from "@/plugin"

export const registerProcesses = (): void => {
  commandDefinition.forEach(({ commandName, defaultProcesses }) => {
    Object.entries(defaultProcesses).forEach(([expectKey, process]) => {
      pluginRegisterFunction(createProcessesFunctionName(commandName, expectKey), process.execute, { sync: false })
    })
  })
}

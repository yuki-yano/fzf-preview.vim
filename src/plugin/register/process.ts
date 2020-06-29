import { processesDefinition } from "@/fzf/process"
import { pluginRegisterFunction } from "@/plugin"
import { syncVimVariable } from "@/plugin/sync-vim-variable"
import { ConvertedLines } from "@/type"

export const registerProcesses = (): void => {
  processesDefinition.forEach(({ processes }) => {
    processes.forEach((process) => {
      pluginRegisterFunction(
        process.name,
        async (lines: ConvertedLines) => {
          await syncVimVariable()
          await process.execute(lines)
        },
        { sync: false }
      )
    })
  })
}

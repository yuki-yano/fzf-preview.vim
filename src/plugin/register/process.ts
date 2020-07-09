import { processesDefinition } from "@/fzf/process"
import { loadExecuteCommandStore } from "@/module/persist"
import { pluginRegisterFunction } from "@/plugin"
import { syncVimVariable } from "@/plugin/sync-vim-variable"
import { dispatch } from "@/store"
import { ConvertedLines } from "@/type"

export const registerProcesses = (): void => {
  processesDefinition.forEach(({ processes }) => {
    processes.forEach((process) => {
      pluginRegisterFunction(
        process.name,
        async ([lines]: [ConvertedLines, ...Array<unknown>]) => {
          await syncVimVariable()
          await dispatch(loadExecuteCommandStore())
          await process.execute(lines)
        },
        { sync: false }
      )
    })
  })
}

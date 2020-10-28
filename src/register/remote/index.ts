import { commandDefinition } from "@/association/command"
import { dispatchResumeQuery } from "@/connector/resume"
import { HANDLER_NAME } from "@/const/fzf-handler"
import { executeCommand } from "@/fzf/command"
import { getDefaultProcesses } from "@/fzf/function"
import { callProcess } from "@/fzf/handler"
import { executeProcess, processesDefinition } from "@/fzf/process"
import { pluginRegisterCommand, pluginRegisterFunction } from "@/plugin"
import type { CallbackLines } from "@/type"

export const registerRemoteCommands = (): void => {
  commandDefinition.forEach((fzfCommand) => {
    pluginRegisterCommand(
      fzfCommand.commandName,
      async (params: Array<string>) => {
        const args = params[0] != null ? params[0] : ""
        await executeCommand(args, fzfCommand)
      },
      fzfCommand.vimCommandOptions
    )
  })
}

export const registerProcesses = (): void => {
  processesDefinition.forEach(({ processes }) => {
    processes.forEach((process) => {
      pluginRegisterFunction(
        process.name,
        async ([lines]: [CallbackLines, ...Array<unknown>]) => {
          await executeProcess(lines, process)
        },
        { sync: false }
      )
    })
  })
}

export const registerFunction = (): void => {
  pluginRegisterFunction(HANDLER_NAME, callProcess, { sync: true })

  pluginRegisterFunction(
    "FzfPreviewGetDefaultProcesses",
    ([processesName]: Array<string>) => getDefaultProcesses(processesName),
    { sync: true }
  )

  pluginRegisterFunction("FzfPreviewDispatchResumeQuery", dispatchResumeQuery, { sync: false })
}

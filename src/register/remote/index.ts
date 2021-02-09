import { commandDefinition } from "@/association/command"
import { dispatchResumeQuery } from "@/connector/resume"
import { HANDLER_NAME } from "@/const/fzf-handler"
import { executeCommand } from "@/fzf/command"
import { getDefaultProcesses } from "@/fzf/function"
import { callProcess } from "@/fzf/handler"
import { executeProcess, processesDefinition } from "@/fzf/process"
import { remotePluginRegisterCommand, remotePluginRegisterFunction } from "@/plugin"
import type { CallbackLines } from "@/type"

export const registerRemoteCommands = (): void => {
  commandDefinition.forEach((fzfCommand) => {
    remotePluginRegisterCommand(
      fzfCommand.commandName,
      async (params: ReadonlyArray<string>) => {
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
      remotePluginRegisterFunction(
        process.name,
        async ([lines]: [CallbackLines, ...ReadonlyArray<unknown>]) => {
          await executeProcess(lines, process)
        },
        { sync: false }
      )
    })
  })
}

export const registerFunction = (): void => {
  remotePluginRegisterFunction(HANDLER_NAME, callProcess, { sync: true })

  remotePluginRegisterFunction(
    "FzfPreviewGetDefaultProcesses",
    ([processesName]: ReadonlyArray<string>) => getDefaultProcesses(processesName),
    { sync: true }
  )

  remotePluginRegisterFunction("FzfPreviewDispatchResumeQuery", dispatchResumeQuery, { sync: false })
}

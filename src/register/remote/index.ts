import { commandDefinition } from "@/association/command"
import { dispatchResumeQuery } from "@/connector/resume"
import { HANDLER_NAME } from "@/const/fzf-handler"
import { cacheMr, cacheMrw } from "@/fzf/cache"
import { executeCommand } from "@/fzf/command"
import { getDefaultProcesses } from "@/fzf/function"
import { callProcess } from "@/fzf/handler"
import { executeProcess, processesDefinition } from "@/fzf/process"
import { environmentModule } from "@/module/environment"
import { pluginRegisterAutocmd, pluginRegisterCommand, pluginRegisterFunction } from "@/plugin"
import { dispatch } from "@/store"
import { existsFile } from "@/system/file"
import { ConvertedLines } from "@/type"

export const initializeRemotePlugin = async (fileName: string): Promise<void> => {
  dispatch(environmentModule.actions.setEnvironment({ environment: "remote" }))
  await cacheMr(fileName)
}

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
        async ([lines]: [ConvertedLines, ...Array<unknown>]) => {
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

export const registerAutocmd = (): void => {
  pluginRegisterAutocmd(
    "BufEnter,BufWinEnter,DirChanged",
    async (fileName: string) => {
      if (existsFile(fileName)) {
        await cacheMr(fileName)
      }
    },
    {
      sync: false,
      pattern: "*",
      eval: 'expand("<afile>:p")',
    }
  )

  pluginRegisterAutocmd("VimEnter", initializeRemotePlugin, {
    sync: false,
    pattern: "*",
    eval: 'expand("<afile>:p")',
  })

  pluginRegisterAutocmd("BufWritePost", cacheMrw, {
    sync: false,
    pattern: "*",
    eval: 'expand("<afile>:p")',
  })
}

import type { commands, Disposable, ExtensionContext } from "coc.nvim"
import { workspace } from "coc.nvim"
import { flatMap, mapValues } from "lodash"

import { cocCommandDefinition } from "@/association/coc-command"
import { dispatchResumeQuery } from "@/connector/resume"
import { HANDLER_NAME } from "@/const/fzf-handler"
import { executeCommand } from "@/fzf/command"
import { getDefaultProcesses } from "@/fzf/function"
import { callProcess } from "@/fzf/handler"
import { executeProcess, processesDefinition } from "@/fzf/process"
import { pluginCommand, setCocClient } from "@/plugin"
import type { CallbackLines } from "@/type"

const removeFzfPreviewPrefix = (name: string) => {
  const result = /^FzfPreview(?<name>\S+)/.exec(name)

  if (result && result.groups) {
    return result.groups.name
  }

  return name
}

export const setRuntimePath = async (context: ExtensionContext): Promise<void> => {
  const rtp = (await workspace.nvim.getOption("runtimepath")) as string
  const paths = rtp.split(",")
  if (!paths.includes(context.extensionPath)) {
    await workspace.nvim.command(`execute 'noautocmd set runtimepath^='.fnameescape('${context.extensionPath}')`)
  }
  await workspace.nvim.command("runtime plugin/fzf_preview.vim")
}

export const initializeExtension = async (): Promise<void> => {
  setCocClient(workspace.nvim)
  await pluginCommand("let g:fzf_preview_has_coc = v:true")
}

export const registerCommands = (commandManager: typeof commands): Array<Disposable> =>
  cocCommandDefinition.map((fzfCommand) =>
    commandManager.registerCommand(
      `fzf-preview.${removeFzfPreviewPrefix(fzfCommand.commandName)}`,
      async (...params: Array<string>) => {
        const args = params.join(" ")
        await executeCommand(args, fzfCommand)
      }
    )
  )

export const registerProcesses = (commandManager: typeof commands): Array<Disposable> =>
  flatMap(processesDefinition, ({ processes }) =>
    processes.map((process) =>
      commandManager.registerCommand(
        `fzf-preview-callback.${removeFzfPreviewPrefix(process.name)}`,
        async ([lines]: [CallbackLines, ...Array<unknown>]) => {
          await executeProcess(lines, process)
        }
      )
    )
  )

export const registerFunctions = (commandManager: typeof commands): Array<Disposable> => [
  commandManager.registerCommand(`fzf-preview.${removeFzfPreviewPrefix(HANDLER_NAME)}`, callProcess),
  commandManager.registerCommand("fzf-preview.GetDefaultProcesses", ([processesName]: Array<string>) =>
    mapValues(getDefaultProcesses(processesName), (name) => name)
  ),
  commandManager.registerCommand("fzf-preview-function.DispatchResumeQuery", dispatchResumeQuery),
]

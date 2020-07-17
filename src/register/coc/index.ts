import { Disposable, ExtensionContext } from "coc.nvim"
import { CommandManager } from "coc.nvim/lib/commands"
import { Workspace } from "coc.nvim/lib/workspace"
import { flatMap, mapValues } from "lodash"

import { cocCommandDefinition } from "@/association/coc-command"
import { dispatchResumeQuery } from "@/connector/resume"
import { HANDLER_NAME } from "@/const/fzf-handler"
import { cacheMr, cacheProjectRoot } from "@/fzf/cache"
import { executeCommand } from "@/fzf/command"
import { getDefaultProcesses } from "@/fzf/function"
import { callProcess } from "@/fzf/handler"
import { executeProcess, processesDefinition } from "@/fzf/process"
import { setCocClient } from "@/plugin"
import type { ConvertedLines } from "@/type"

const removeFzfPreviewPrefix = (name: string) => {
  const result = /^FzfPreview(?<name>\S+)/.exec(name)

  if (result && result.groups) {
    return result.groups.name
  }
  return name
}

export const setRuntimePath = async (context: ExtensionContext, { nvim }: Workspace): Promise<void> => {
  const rtp = (await nvim.getOption("runtimepath")) as string
  const paths = rtp.split(",")
  if (!paths.includes(context.extensionPath)) {
    await nvim.command(`execute 'noautocmd set runtimepath^='.fnameescape('${context.extensionPath}')`)
  }
  await nvim.command("runtime plugin/fzf_preview.vim")
}

export const initializeExtension = async (workspace: Workspace): Promise<void> => {
  setCocClient(workspace.nvim)
  await cacheProjectRoot()
  await cacheMr()
}

export const registerCommands = (commandManager: CommandManager): Array<Disposable> => {
  return cocCommandDefinition.map((fzfCommand) => {
    return commandManager.registerCommand(
      `fzf-preview.${removeFzfPreviewPrefix(fzfCommand.commandName)}`,
      async (...params: Array<string>) => {
        const args = params.join(" ")
        await executeCommand(args, fzfCommand)
      }
    )
  })
}

export const registerProcesses = (commandManager: CommandManager): Array<Disposable> => {
  return flatMap(processesDefinition, ({ processes }) => {
    return processes.map((process) => {
      return commandManager.registerCommand(
        `fzf-preview.${removeFzfPreviewPrefix(process.name)}`,
        async ([lines]: [ConvertedLines, ...Array<unknown>]) => {
          await executeProcess(lines, process)
        }
      )
    })
  })
}

export const registerFunctions = (commandManager: CommandManager): Array<Disposable> => {
  return [
    commandManager.registerCommand(`fzf-preview.${removeFzfPreviewPrefix(HANDLER_NAME)}`, callProcess),
    commandManager.registerCommand("fzf-preview.GetDefaultProcesses", ([processesName]: Array<string>) => {
      return mapValues(getDefaultProcesses(processesName), (value) => removeFzfPreviewPrefix(value))
    }),
    commandManager.registerCommand("fzf-preview.CacheMr", cacheMr),
    commandManager.registerCommand("fzf-preview.DispatchResumeQuery", dispatchResumeQuery),
  ]
}

export const registerAutocmds = (workspace: Workspace): Array<Disposable> => {
  return [
    workspace.registerAutocmd({
      event: "DirChanged",
      request: true,
      callback: async () => {
        await cacheProjectRoot()
      },
      pattern: "*",
    }),
  ]
}

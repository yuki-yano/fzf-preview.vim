import type { ExtensionContext } from "coc.nvim"
import { commands } from "coc.nvim"

import {
  initializeExtension,
  registerCommands,
  registerFunctions,
  registerProcesses,
  setRuntimePath,
} from "@/register/coc"

export async function activate(context: ExtensionContext): Promise<void> {
  await initializeExtension()
  await setRuntimePath(context)

  context.subscriptions.push(
    ...registerCommands(commands),
    ...registerProcesses(commands),
    ...registerFunctions(commands)
  )
}

import type { ExtensionContext } from "coc.nvim"
import { commands, workspace } from "coc.nvim"

import {
  initializeExtension,
  registerCommands,
  registerFunctions,
  registerProcesses,
  setRuntimePath,
} from "@/register/coc"

// eslint-disable-next-line @typescript-eslint/require-await
export async function activate(context: ExtensionContext): Promise<void> {
  await setRuntimePath(context, workspace)
  initializeExtension(workspace)

  context.subscriptions.push(
    ...registerCommands(commands),
    ...registerProcesses(commands),
    ...registerFunctions(commands)
  )

  await workspace.nvim.command("silent doautocmd User fzf_preview#initialized")
}

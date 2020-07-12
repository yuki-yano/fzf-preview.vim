import { commands, ExtensionContext, workspace } from "coc.nvim"

import {
  initializeExtension,
  registerAutocmds,
  registerCommands,
  registerFunctions,
  registerProcesses,
  setRuntimePath,
} from "@/register/coc"

// eslint-disable-next-line @typescript-eslint/require-await
export async function activate(context: ExtensionContext): Promise<void> {
  await setRuntimePath(context, workspace)
  await initializeExtension(workspace)

  context.subscriptions.push(
    ...registerCommands(commands),
    ...registerProcesses(commands),
    ...registerFunctions(commands),
    ...registerAutocmds(workspace)
  )

  await workspace.nvim.command("silent doautocmd User fzf_preview#initialized")
}

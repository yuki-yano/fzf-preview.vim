import { pluginCall } from "@/plugin"
import type { FzfCommandName } from "@/type"

export const execFzfCommand = async (command: FzfCommandName): Promise<void> => {
  await pluginCall("fzf_preview#remote#exec_fzf#exec", [command, PLUGIN.ENV])
}

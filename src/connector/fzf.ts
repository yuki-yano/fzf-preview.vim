import { sessionModule } from "@/module/session"
import { pluginCall } from "@/plugin"
import { dispatch } from "@/store"
import type { FzfCommandName } from "@/type"

type Options = {
  sessionToken?: string
  clearSession?: boolean
}

export const execFzfCommand = async (command: FzfCommandName, options?: Options): Promise<void> => {
  if (options != null && options.clearSession === true) {
    dispatch(sessionModule.actions.clearCurrentSession())
  }

  if (options != null && options.sessionToken != null) {
    await pluginCall("fzf_preview#remote#exec_fzf#exec", [command, PLUGIN.ENV, options.sessionToken])
  } else {
    await pluginCall("fzf_preview#remote#exec_fzf#exec", [command, PLUGIN.ENV])
  }
}

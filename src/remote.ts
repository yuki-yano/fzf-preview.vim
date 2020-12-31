import type { NvimPlugin } from "neovim"

import { pluginGetVar, setRemotePlugin } from "@/plugin"
import { registerFunction, registerProcesses, registerRemoteCommands } from "@/register/remote"

module.exports = async (plugin: NvimPlugin) => {
  setRemotePlugin(plugin)

  const disableRemotePlugin = await pluginGetVar("fzf_preview_disable_remote_plugin")
  if (disableRemotePlugin) {
    return
  }

  if (process.env.FZF_PREVIEW_DEBUG === "1") {
    plugin.setOptions({ dev: true, alwaysInit: true })
  }

  registerRemoteCommands()
  registerProcesses()
  registerFunction()

  plugin.registerCommand(
    "FzfPreviewRemoteEnvironment",
    async (_args: Array<string>) => {
      await plugin.nvim.command("echo 'fzf-preview is remote plugin'")
    },
    { nargs: "*" }
  )
}

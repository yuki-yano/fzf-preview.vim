import type { NvimPlugin } from "neovim"

import { setRemotePlugin } from "@/plugin"
import { registerFunction, registerProcesses, registerRemoteCommands } from "@/register/remote"

module.exports = (plugin: NvimPlugin) => {
  setRemotePlugin(plugin)

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

/* eslint-disable import/no-import-module-exports */
import type { NvimPlugin } from "neovim"

import { setRemotePlugin } from "@/plugin"
import { registerFunction, registerProcesses, registerRemoteCommands } from "@/register/remote"
/* eslint-enable */

module.exports = (plugin: NvimPlugin) => {
  setRemotePlugin(plugin)

  registerRemoteCommands()
  registerProcesses()
  registerFunction()

  plugin.registerCommand(
    "FzfPreviewRemoteEnvironment",
    async (_args: ReadonlyArray<string>) => {
      await plugin.nvim.command("echo 'fzf-preview is remote plugin'")
    },
    { nargs: "*" }
  )
}

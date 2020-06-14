import { NvimPlugin } from "neovim"

import { setPlugin } from "@/plugin"
import { registerAutocmd, registerCommands, registerHandlers, registerProcesses } from "@/plugin/register"

module.exports = (plugin: NvimPlugin) => {
  setPlugin(plugin)

  if (process.env.FZF_PREVIEW_DEBUG === "1") {
    plugin.setOptions({ dev: true, alwaysInit: true })
  }

  registerCommands()
  registerHandlers()
  registerProcesses()
  registerAutocmd()

  plugin.registerCommand(
    "HelloFzfPreview",
    (_args: Array<string>) => {
      plugin.nvim.command("echo 'Hello FzfPreview!'")
      console.log("Hello FzfPreview!")
    },
    { nargs: "*" }
  )
}

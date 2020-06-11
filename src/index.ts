import { NvimPlugin } from "neovim"

import { setPlugin } from "@/plugin"
import { registerCommands } from "@/plugin/register/command"
import { registerHandlers } from "@/plugin/register/handler"
import { registerProcesses } from "@/plugin/register/process"

module.exports = (plugin: NvimPlugin) => {
  setPlugin(plugin)

  if (process.env.FZF_PREVIEW_DEBUG === "1") {
    plugin.setOptions({ dev: true, alwaysInit: true })
  }

  registerCommands()
  registerHandlers()
  registerProcesses()

  plugin.registerCommand(
    "HelloFzfPreview",
    (_args: Array<string>) => {
      plugin.nvim.command("echo 'Hello FzfPreview!'")
      console.log("Hello FzfPreview!")
    },
    { nargs: "*" }
  )
}

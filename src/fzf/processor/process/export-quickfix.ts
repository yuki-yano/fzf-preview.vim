import { createOnceProcess } from "@/fzf/processor/process/process"
import { pluginCall, pluginCommand } from "@/plugin"

const linesToQfArgs = (lines: Array<string>) =>
  lines.map((line) => ({
    filename: line
  }))

const exportQuickfix = (lines: Array<string>) => {
  pluginCall("setqflist", [linesToQfArgs(lines)])
  pluginCommand("copen")
}

export const exportQuickfixProcess = createOnceProcess(exportQuickfix)

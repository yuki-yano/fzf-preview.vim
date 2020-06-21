import { pluginCall, pluginCommand } from "@/plugin"
import type { ExportQuickFix, OpenFile } from "@/type"

export const openFile = async ({ openCommand, file, lineNumber }: OpenFile) => {
  await pluginCommand(`execute 'silent ${openCommand} ${file}'`)
  if (lineNumber != null) {
    await pluginCall("cursor", [lineNumber, 0])
  }
}

export const exportQuickFix = async (quickFixList: Array<ExportQuickFix>) => {
  await pluginCall("setqflist", [quickFixList])
  await pluginCommand("copen")
}

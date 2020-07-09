import { pluginCall, pluginCommand } from "@/plugin"
import type { ExportQuickFix, OpenFile } from "@/type"

export const openFile = async ({ openCommand, file, lineNumber }: OpenFile): Promise<void> => {
  await pluginCommand(`execute 'silent ${openCommand} ${file}'`)
  if (lineNumber != null) {
    await pluginCall("cursor", [lineNumber, 0])
  }
}

type Option = {
  title?: string
}

export const exportQuickFix = async (quickFixList: Array<ExportQuickFix>, option?: Option): Promise<void> => {
  await pluginCall("setqflist", [[], "r", { items: quickFixList, ...option }])
  await pluginCommand("copen")
}

import type { ReadonlyDeep } from "type-fest"

import { pluginCall, pluginCommand } from "@/plugin"
import type { ExportQuickFix, OpenFile } from "@/type"

export const openFile = async ({
  openCommand,
  file,
  lineNumber,
  setTagStack,
}: ReadonlyDeep<OpenFile>): Promise<void> => {
  if (setTagStack === true) {
    await pluginCall("fzf_preview#remote#tagstack#push_tag_stack")
  }
  await pluginCommand(`execute 'silent ${openCommand} ${file}'`)
  if (lineNumber != null) {
    await pluginCall("cursor", [lineNumber, 0])
  }
}

type Option = {
  readonly title?: string
}

export const exportQuickFix = async (
  quickFixList: ReadonlyDeep<ReadonlyArray<ExportQuickFix>>,
  option?: Option
): Promise<void> => {
  await pluginCall("setqflist", [[], "r", { items: quickFixList, ...option }])
  await pluginCommand("copen")
}

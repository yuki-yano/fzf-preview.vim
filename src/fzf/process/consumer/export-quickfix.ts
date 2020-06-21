import { createBulkLineConsumer } from "@/fzf/process/consumer/consumer"
import { pluginCall, pluginCommand } from "@/plugin"
import type { ConvertedLines } from "@/type"

const linesToQfArgs = (lines: ConvertedLines) =>
  lines.map((line) => ({
    filename: line
  }))

export const exportQuickfixConsumer = createBulkLineConsumer(async (lines) => {
  await pluginCall("setqflist", [linesToQfArgs(lines)])
  await pluginCommand("copen")
})

import { createSingleLineConsumer } from "@/fzf/process/consumer/consumer"
import { execSyncCommand } from "@/system/command"

// eslint-disable-next-line @typescript-eslint/require-await
export const openPr = createSingleLineConsumer(async (convertedLine) => {
  execSyncCommand(`gh pr view --web ${convertedLine}`)
})

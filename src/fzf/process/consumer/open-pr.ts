import { createSingleLineConsumer } from "@/fzf/process/consumer/consumer"
import { execCommand } from "@/system/command"

// eslint-disable-next-line @typescript-eslint/require-await
export const openPr = createSingleLineConsumer(async (convertedLine) => {
  execCommand(`gh pr view --web ${convertedLine}`)
})

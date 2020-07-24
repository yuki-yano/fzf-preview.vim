import { createSingleLineConsumer } from "@/fzf/process/consumer"
import { execSyncCommand } from "@/system/command"

// eslint-disable-next-line @typescript-eslint/require-await
export const openPr = createSingleLineConsumer(async (data) => {
  if (data.type === "git-pr" && data.prNumber != null) {
    execSyncCommand(`gh pr view --web ${data.prNumber}`)
  } else {
    throw new Error("Data has no PR")
  }
})

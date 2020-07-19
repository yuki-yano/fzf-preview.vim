import { gitAdd, gitPatch, gitReset } from "@/connector/git"
import { vimEchoMessage } from "@/connector/util"
import { createBulkLineConsumer, createSingleLineConsumer } from "@/fzf/process/consumer/consumer"

export const gitAddConsumer = createBulkLineConsumer(async (convertedLines) => {
  for (const line of convertedLines) {
    gitAdd(line)
  }

  await vimEchoMessage(`git add ${convertedLines.join(" ")}`)
})

export const gitResetConsumer = createBulkLineConsumer(async (convertedLines) => {
  for (const line of convertedLines) {
    gitReset(line)
  }

  await vimEchoMessage(`git reset ${convertedLines.join(" ")}`)
})

export const gitPatchConsumer = createSingleLineConsumer(async (convertedLine) => {
  await gitPatch(convertedLine)
})

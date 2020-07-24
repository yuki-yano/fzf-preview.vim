import { gitShow } from "@/connector/git"
import { vimEchoMessage } from "@/connector/util"
import { createSingleLineConsumer } from "@/fzf/process/consumer/consumer"

export const gitShowConsumer = createSingleLineConsumer(async (data) => {
  if (data.type !== "git-log") {
    throw new Error(`Unexpected data type: ${data.type}`)
  }

  await gitShow(data.hash)
  await vimEchoMessage(`git show ${data.hash}`)
})

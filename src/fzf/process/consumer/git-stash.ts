import { gitShow, gitStashCreate } from "@/connector/git"
import { vimEchoMessage } from "@/connector/util"
import { chainFzfCommand, createBulkLineConsumer } from "@/fzf/process/consumer"
import type { GitStashData } from "@/type"

export const chainGitStashActionsConsumer = createBulkLineConsumer(async (dataList) => {
  const gitStashData = dataList.filter((data): data is GitStashData => data.type === "git-stash")
  await chainFzfCommand("FzfPreviewGitStashActions", { gitStashes: gitStashData })
})

export const gitStashDefaultConsumer = createBulkLineConsumer(async (dataList) => {
  if (dataList.length > 1) {
    throw new Error("The git stash show should not be multiple lines.")
  }

  const data = dataList[0]

  if (data.type !== "git-stash") {
    throw new Error(`Unexpected data type: ${data.type}`)
  }

  if (data.isCreate === false) {
    await gitShow(data.hash)
    await vimEchoMessage(`git show ${data.hash}`)
  } else {
    await gitStashCreate()
    await chainFzfCommand("FzfPreviewGitStashes")
  }
})

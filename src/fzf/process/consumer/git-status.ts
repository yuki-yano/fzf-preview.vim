import { gitAdd, gitCommit, gitReset } from "@/connector/git"
import { vimEchoMessage } from "@/connector/util"
import { chainFzfCommand, createBulkLineConsumer } from "@/fzf/process/consumer"
import type { GitStatusData } from "@/type"

export const chainGitStatusActionsConsumer = createBulkLineConsumer(async (dataList) => {
  const gitStatusDataList = dataList.filter((data): data is GitStatusData => data.type === "git-status")
  await chainFzfCommand("FzfPreviewGitStatusActions", { gitStatusDataList })
})

export const gitAddConsumer = createBulkLineConsumer(async (dataList) => {
  const gitDataList = dataList.filter((data): data is GitStatusData => data.type === "git-status")

  for (const data of gitDataList) {
    // eslint-disable-next-line no-await-in-loop
    await gitAdd(data.file)
  }

  await vimEchoMessage(`git add ${gitDataList.map((data) => data.file).join(" ")}`)
  await chainFzfCommand("FzfPreviewGitStatus")
})

export const gitResetConsumer = createBulkLineConsumer(async (dataList) => {
  const gitDataList = dataList.filter((data): data is GitStatusData => data.type === "git-status")

  for (const data of gitDataList) {
    // eslint-disable-next-line no-await-in-loop
    await gitReset(data.file)
  }

  await vimEchoMessage(`git reset ${gitDataList.map((data) => data.file).join(" ")}`)
  await chainFzfCommand("FzfPreviewGitStatus")
})

export const gitCommitConsumer = createBulkLineConsumer(async (_) => {
  await gitCommit()
})

import { execFzfCommand } from "@/connector/fzf"
import { gitAdd, gitPatch, gitReset } from "@/connector/git"
import { vimEchoMessage } from "@/connector/util"
import { createBulkLineConsumer, createSingleLineConsumer } from "@/fzf/process/consumer"
import { GitStatusData } from "@/type"

export const gitAddConsumer = createBulkLineConsumer(async (dataList) => {
  const gitDataList = dataList.filter((data): data is GitStatusData => data.type === "git-status")

  for (const data of gitDataList) {
    // eslint-disable-next-line no-await-in-loop
    await gitAdd(data.file)
  }

  await vimEchoMessage(`git add ${gitDataList.map((data) => data.file).join(" ")}`)
  await execFzfCommand("FzfPreviewGitStatus")
})

export const gitResetConsumer = createBulkLineConsumer(async (dataList) => {
  const gitDataList = dataList.filter((data): data is GitStatusData => data.type === "git-status")

  for (const data of gitDataList) {
    // eslint-disable-next-line no-await-in-loop
    await gitReset(data.file)
  }

  await vimEchoMessage(`git reset ${gitDataList.map((data) => data.file).join(" ")}`)
  await execFzfCommand("FzfPreviewGitStatus")
})

export const gitPatchConsumer = createSingleLineConsumer(async (data) => {
  await gitPatch((data as GitStatusData).file)
})

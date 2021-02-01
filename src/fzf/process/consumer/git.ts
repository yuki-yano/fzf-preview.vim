import { gitCreateBranch, gitSwitch } from "@/connector/git"
import { vimEchoMessage } from "@/connector/util"
import { chainFzfCommand, createBulkLineConsumer } from "@/fzf/process/consumer"

export const chainGitActionsConsumer = createBulkLineConsumer(async (_) => {
  await chainFzfCommand("FzfPreviewGitActions")
})

export const chainGitStatusConsumer = createBulkLineConsumer(async (_) => {
  await chainFzfCommand("FzfPreviewGitStatus")
})

export const chainGitBranchesConsumer = createBulkLineConsumer(async (_) => {
  await chainFzfCommand("FzfPreviewGitBranches")
})

export const chainGitStashesConsumer = createBulkLineConsumer(async (_) => {
  await chainFzfCommand("FzfPreviewGitStashes")
})

export const chainGitReflogsConsumer = createBulkLineConsumer(async (_) => {
  await chainFzfCommand("FzfPreviewGitReflogs")
})

export const chainGitLogsConsumer = createBulkLineConsumer(async (dataList) => {
  if (dataList[0].type === "git-log-actions" && dataList[0].isCurrentFile === true) {
    await chainFzfCommand("FzfPreviewGitCurrentLogs")
  } else if (dataList[0].type === "git-log-actions" && dataList[0].isCurrentFile === false) {
    await chainFzfCommand("FzfPreviewGitLogs")
  }
})

export const gitSwitchConsumer = createBulkLineConsumer(async (dataList) => {
  if (dataList.length > 1) {
    throw new Error("The git switch should not be multiple lines.")
  }

  const data = dataList[0]

  switch (data.type) {
    case "git-branch": {
      if (data.isCreate === false) {
        await gitSwitch(data.name)
        await vimEchoMessage(`git switch ${data.name}`)
      } else {
        await gitCreateBranch()
      }
      break
    }
    case "git-log": {
      await gitSwitch(data.hash)
      await vimEchoMessage(`git switch ${data.hash}`)
      break
    }

    default: {
      throw new Error(`Unexpected data type: ${data.type}`)
    }
  }

  await chainFzfCommand("FzfPreviewGitBranches")
})

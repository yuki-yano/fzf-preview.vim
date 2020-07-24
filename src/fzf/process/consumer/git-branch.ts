import { v4 as uuidv4 } from "uuid"

import { execFzfCommand } from "@/connector/fzf"
import { gitCheckout } from "@/connector/git"
import { vimEchoMessage } from "@/connector/util"
import { createBulkLineConsumer } from "@/fzf/process/consumer/consumer"
import { saveStore } from "@/module/persist"
import { sessionModule } from "@/module/session"
import { dispatch } from "@/store"
import { GitBranchData } from "@/type"

export const gitCheckoutConsumer = createBulkLineConsumer(async (dataList) => {
  if (dataList.length > 1) {
    throw new Error("The git checkout should not be multiple lines.")
  }

  const data = dataList[0]
  if (data.type !== "git-branch") {
    throw new Error(`Unexpected data type: ${data.type}`)
  }

  await gitCheckout(data.name)
  await vimEchoMessage(`git checkout ${data.name}`)
  await execFzfCommand("FzfPreviewGitBranches")
})

export const chainGitBranchActionsConsumer = createBulkLineConsumer(async (dataList) => {
  const gitBranchData = dataList.filter((data): data is GitBranchData => data.type === "git-branch")

  const sessionToken = uuidv4()
  dispatch(sessionModule.actions.setSession({ session: { gitBranches: gitBranchData }, sessionToken }))
  await dispatch(saveStore({ modules: ["session"] }))

  await execFzfCommand("FzfPreviewGitBranchActions", { sessionToken })
})

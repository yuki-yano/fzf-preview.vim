import { v4 as uuidv4 } from "uuid"

import { execFzfCommand } from "@/connector/fzf"
import { createBulkLineConsumer } from "@/fzf/process/consumer/consumer"
import { saveStore } from "@/module/persist"
import { sessionModule } from "@/module/session"
import { dispatch } from "@/store"
import { GitBranchData } from "@/type"

export const chainGitBranchActionsConsumer = createBulkLineConsumer(async (dataList) => {
  const gitBranchData = dataList.filter((data): data is GitBranchData => data.type === "git-branch")

  const sessionToken = uuidv4()
  dispatch(sessionModule.actions.setSession({ session: { gitBranches: gitBranchData }, sessionToken }))
  await dispatch(saveStore({ modules: ["session"] }))

  await execFzfCommand("FzfPreviewGitBranchActions", { sessionToken })
})

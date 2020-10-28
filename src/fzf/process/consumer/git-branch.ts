import { chainFzfCommand, createBulkLineConsumer } from "@/fzf/process/consumer"
import type { GitBranchData } from "@/type"

export const chainGitBranchActionsConsumer = createBulkLineConsumer(async (dataList) => {
  const gitBranchData = dataList.filter((data): data is GitBranchData => data.type === "git-branch")
  await chainFzfCommand("FzfPreviewGitBranchActions", { gitBranches: gitBranchData })
})

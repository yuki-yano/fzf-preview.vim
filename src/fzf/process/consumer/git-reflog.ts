import { chainFzfCommand, createBulkLineConsumer } from "@/fzf/process/consumer"
import type { GitReflogData } from "@/type"

export const chainGitReflogActionsConsumer = createBulkLineConsumer(async (dataList) => {
  const gitReflogData = dataList.filter((data): data is GitReflogData => data.type === "git-reflog")
  await chainFzfCommand("FzfPreviewGitReflogActions", { gitReflogs: gitReflogData })
})

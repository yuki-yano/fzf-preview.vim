import { execFzfCommand } from "@/connector/fzf"
import { gitBranchYank, gitCheckout, gitDiff } from "@/connector/git"
import { createSingleLineConsumer } from "@/fzf/process/consumer/consumer"
import { unreachable } from "@/util/type"

/* eslint-disable complexity */
export const execGitBranchActionConsumer = createSingleLineConsumer(async (data) => {
  if (data.type !== "git-branch-actions") {
    throw new Error(`Unexpected data type: ${data.type}`)
  }

  switch (data.action) {
    case "checkout": {
      if (data.branches.length > 1) {
        throw new Error("Branch must be one")
      }

      await gitCheckout(data.branches[0])
      await execFzfCommand("FzfPreviewGitBranches", { clearSession: true })
      break
    }
    case "diff": {
      if (data.branches.length > 2) {
        throw new Error("Branch must be one or two")
      }

      await gitDiff(data.branches[0], data.branches[1])
      await execFzfCommand("FzfPreviewGitBranches", { clearSession: true })
      break
    }
    case "yank": {
      if (data.branches.length > 1) {
        throw new Error("Branch must be one")
      }

      await gitBranchYank(data.branches[0])
      await execFzfCommand("FzfPreviewGitBranches", { clearSession: true })
      break
    }

    default: {
      unreachable(data.action)
    }
  }
})
/* eslint-enable complexity */

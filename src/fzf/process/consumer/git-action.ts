import { execFzfCommand } from "@/connector/fzf"
import { gitCommit, gitPush } from "@/connector/git"
import { createSingleLineConsumer } from "@/fzf/process/consumer"
import { unreachable } from "@/util/type"

/* eslint-disable complexity */
export const execGitActionConsumer = createSingleLineConsumer(async (data) => {
  if (data.type !== "git-actions") {
    throw new Error(`Unexpected data type: ${data.type}`)
  }

  switch (data.action) {
    case "status": {
      await execFzfCommand("FzfPreviewGitStatus")
      break
    }
    case "branch": {
      await execFzfCommand("FzfPreviewGitBranches")
      break
    }
    case "log": {
      await execFzfCommand("FzfPreviewGitLogs")
      break
    }
    case "current-log": {
      await execFzfCommand("FzfPreviewGitCurrentLogs")
      break
    }
    case "commit": {
      await gitCommit()
      break
    }
    case "commit --amend": {
      await gitCommit({ name: "--amend" })
      break
    }
    case "commit --amend --no-edit": {
      await gitCommit({ name: "--amend --no-edit" })
      break
    }
    case "push": {
      await gitPush()
      break
    }
    case "push --force": {
      await gitPush("--force")
      break
    }

    case "header": {
      break
    }

    default: {
      unreachable(data.action)
    }
  }
})
/* eslint-enable complexity */

import { execFzfCommand } from "@/connector/fzf"
import { createSingleLineConsumer } from "@/fzf/process/consumer"
import { unreachable } from "@/util/type"

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

    default: {
      unreachable(data.action)
    }
  }
})

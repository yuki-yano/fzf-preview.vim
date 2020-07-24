import { execFzfCommand } from "@/connector/fzf"
import { createSingleLineConsumer } from "@/fzf/process/consumer/consumer"

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

    default: {
      throw new Error(`Unexpected data action: ${data.action}`)
    }
  }
})

import { gitCheckout, gitReset, gitShow, gitYank } from "@/connector/git"
import { chainFzfCommand, createSingleLineConsumer } from "@/fzf/process/consumer"
import { unreachable } from "@/util/type"

/* eslint-disable complexity */
export const execGitLogActionConsumer = createSingleLineConsumer(async (data) => {
  if (data.type !== "git-log-actions") {
    throw new Error(`Unexpected data type: ${data.type}`)
  }

  switch (data.action) {
    case "show": {
      if (data.hashes.length > 1) {
        throw new Error("Hashes must be one")
      }

      await gitShow(data.hashes[0])
      await chainFzfCommand("FzfPreviewGitLogs")
      break
    }
    case "reset": {
      if (data.hashes.length > 1) {
        throw new Error("Hashes must be one")
      }

      await gitReset(data.hashes[0])
      await chainFzfCommand("FzfPreviewGitLogs")
      break
    }
    case "reset-soft": {
      if (data.hashes.length > 1) {
        throw new Error("Hashes must be one")
      }

      await gitReset(data.hashes[0], "--soft")
      await chainFzfCommand("FzfPreviewGitLogs")
      break
    }
    case "reset-hard": {
      if (data.hashes.length > 1) {
        throw new Error("Hashes must be one")
      }

      await gitReset(data.hashes[0], "--hard")
      await chainFzfCommand("FzfPreviewGitLogs")
      break
    }
    case "checkout": {
      if (data.hashes.length > 1) {
        throw new Error("Hashes must be one")
      }

      await gitCheckout(data.hashes[0])
      await chainFzfCommand("FzfPreviewGitLogs")
      break
    }
    case "yank": {
      if (data.hashes.length > 1) {
        throw new Error("Hashes must be one")
      }

      await gitYank(data.hashes[0])
      await chainFzfCommand("FzfPreviewGitLogs")
      break
    }

    default: {
      unreachable(data.action)
    }
  }
})
/* eslint-enable complexity */

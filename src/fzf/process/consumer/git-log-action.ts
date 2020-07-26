import { gitCheckout, gitCommit, gitReset, gitShow, gitYank } from "@/connector/git"
import { chainFzfCommand, createSingleLineConsumer } from "@/fzf/process/consumer"
import { FzfCommandName } from "@/type"
import { unreachable } from "@/util/type"

/* eslint-disable complexity */
export const execGitLogActionConsumer = createSingleLineConsumer(async (data) => {
  if (data.type !== "git-log-actions") {
    throw new Error(`Unexpected data type: ${data.type}`)
  }

  const nextCommand: FzfCommandName = data.isCurrentFile ? "FzfPreviewGitCurrentLogs" : "FzfPreviewGitLogs"

  switch (data.action) {
    case "show": {
      if (data.hashes.length > 1) {
        throw new Error("Hashes must be one")
      }

      await gitShow(data.hashes[0])
      await chainFzfCommand(nextCommand)
      break
    }
    case "reset": {
      if (data.hashes.length > 1) {
        throw new Error("Hashes must be one")
      }

      await gitReset(data.hashes[0])
      await chainFzfCommand(nextCommand)
      break
    }
    case "reset-soft": {
      if (data.hashes.length > 1) {
        throw new Error("Hashes must be one")
      }

      await gitReset(data.hashes[0], "--soft")
      await chainFzfCommand(nextCommand)
      break
    }
    case "reset-hard": {
      if (data.hashes.length > 1) {
        throw new Error("Hashes must be one")
      }

      await gitReset(data.hashes[0], "--hard")
      await chainFzfCommand(nextCommand)
      break
    }
    case "checkout": {
      if (data.hashes.length > 1) {
        throw new Error("Hashes must be one")
      }

      await gitCheckout(data.hashes[0])
      await chainFzfCommand(nextCommand)
      break
    }
    case "commit --squash": {
      if (data.hashes.length > 1) {
        throw new Error("Hashes must be one")
      }

      await gitCommit({ name: "--squash", hash: data.hashes[0] })
      break
    }
    case "commit --fixup": {
      if (data.hashes.length > 1) {
        throw new Error("Hashes must be one")
      }

      await gitCommit({ name: "--fixup", hash: data.hashes[0] })
      await chainFzfCommand(nextCommand)
      break
    }
    case "yank": {
      if (data.hashes.length > 1) {
        throw new Error("Hashes must be one")
      }

      await gitYank(data.hashes[0])
      await chainFzfCommand(nextCommand)
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

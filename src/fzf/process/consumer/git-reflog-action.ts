import { gitCheckout, gitDiff, gitReset, gitShow, gitYank } from "@/connector/git"
import { chainFzfCommand, createSingleLineConsumer } from "@/fzf/process/consumer"
import { unreachable } from "@/util/type"

// eslint-disable-next-line complexity
export const execGitReflogActionConsumer = createSingleLineConsumer(async (data) => {
  if (data.type !== "git-reflog-actions") {
    throw new Error(`Unexpected data type: ${data.type}`)
  }
  if (data.hashes.length === 0) {
    throw new Error("Reflogs must be more then one")
  }

  switch (data.action) {
    case "show": {
      if (data.hashes.length !== 1) {
        throw new Error("Reflogs must be one")
      }

      await gitShow(data.hashes[0])
      break
    }
    case "diff": {
      if (data.hashes.length !== 1 && data.hashes.length !== 2) {
        throw new Error("Reflogs must be one or two")
      }

      await gitDiff(data.hashes[0], data.hashes[1])
      break
    }
    case "reset": {
      if (data.hashes.length > 1) {
        throw new Error("Hashes must be one")
      }

      await gitReset(data.hashes[0])
      await chainFzfCommand("FzfPreviewGitReflogs")
      break
    }
    case "reset-soft": {
      if (data.hashes.length > 1) {
        throw new Error("Hashes must be one")
      }

      await gitReset(data.hashes[0], "--soft")
      await chainFzfCommand("FzfPreviewGitReflogs")
      break
    }
    case "reset-hard": {
      if (data.hashes.length > 1) {
        throw new Error("Hashes must be one")
      }

      await gitReset(data.hashes[0], "--hard")
      await chainFzfCommand("FzfPreviewGitReflogs")
      break
    }
    case "checkout": {
      if (data.hashes.length > 1) {
        throw new Error("Hashes must be one")
      }

      await gitCheckout(data.hashes[0])
      await chainFzfCommand("FzfPreviewGitReflogs")
      break
    }
    case "yank": {
      if (data.hashes.length !== 1) {
        throw new Error("Reflogs must be one")
      }

      await gitYank(data.hashes[0])
      await chainFzfCommand("FzfPreviewGitReflogs")
      break
    }

    case "header": {
      break
    }

    default: {
      unreachable(data)
    }
  }
})

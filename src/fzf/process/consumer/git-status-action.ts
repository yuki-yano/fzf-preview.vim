import { gitAdd, gitCheckout, gitPatch, gitReset } from "@/connector/git"
import { chainFzfCommand, createSingleLineConsumer } from "@/fzf/process/consumer"
import { unreachable } from "@/util/type"

/* eslint-disable complexity */
export const execGitStatusActionConsumer = createSingleLineConsumer(async (data) => {
  if (data.type !== "git-status-actions") {
    throw new Error(`Unexpected data type: ${data.type}`)
  }
  if (data.files.length === 0) {
    throw new Error("Files must be more then one")
  }

  switch (data.action) {
    case "add": {
      for (const file of data.files) {
        // eslint-disable-next-line
        await gitAdd(file)
      }
      await chainFzfCommand("FzfPreviewGitStatus")
      break
    }
    case "reset": {
      for (const file of data.files) {
        // eslint-disable-next-line
        await gitReset(file)
      }
      await chainFzfCommand("FzfPreviewGitStatus")
      break
    }
    case "patch": {
      for (const file of data.files) {
        // eslint-disable-next-line
        await gitPatch(file)
      }
      break
    }
    case "checkout": {
      for (const file of data.files) {
        // eslint-disable-next-line
        await gitCheckout(file)
      }
      await chainFzfCommand("FzfPreviewGitStatus")
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
/* eslint-enable complexity */

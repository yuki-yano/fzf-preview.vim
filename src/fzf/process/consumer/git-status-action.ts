import {
  gitAdd,
  gitAddIntentToAdd,
  gitChaperon,
  gitPatch,
  gitReset,
  gitResetIntentToAdd,
  gitRestore,
} from "@/connector/git"
import { chainFzfCommand, createSingleLineConsumer } from "@/fzf/process/consumer"
import { unreachable } from "@/util/type"

// eslint-disable-next-line complexity
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
        // eslint-disable-next-line no-await-in-loop
        await gitAdd(file)
      }
      await chainFzfCommand("FzfPreviewGitStatus")
      break
    }
    case "reset": {
      for (const file of data.files) {
        // eslint-disable-next-line no-await-in-loop
        await gitReset(file)
      }
      await chainFzfCommand("FzfPreviewGitStatus")
      break
    }
    case "patch": {
      for (const file of data.files) {
        // eslint-disable-next-line no-await-in-loop
        await gitPatch(file)
      }
      break
    }
    case "restore": {
      for (const file of data.files) {
        // eslint-disable-next-line no-await-in-loop
        await gitRestore(file)
      }
      await chainFzfCommand("FzfPreviewGitStatus")
      break
    }
    case "chaperon": {
      for (const file of data.files) {
        // eslint-disable-next-line no-await-in-loop
        await gitChaperon(file)
      }
      break
    }

    case "add --intent-to-add": {
      for (const file of data.files) {
        // eslint-disable-next-line no-await-in-loop
        await gitAddIntentToAdd(file)
      }
      await chainFzfCommand("FzfPreviewGitStatus")
      break
    }

    case "reset --intent-to-add": {
      for (const file of data.files) {
        // eslint-disable-next-line no-await-in-loop
        await gitResetIntentToAdd(file)
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

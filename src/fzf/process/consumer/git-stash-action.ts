import { gitDiff, gitShow, gitStashApply, gitStashDrop, gitStashPop, gitYank } from "@/connector/git"
import { chainFzfCommand, createSingleLineConsumer } from "@/fzf/process/consumer"
import { unreachable } from "@/util/type"

// eslint-disable-next-line complexity
export const execGitStashActionConsumer = createSingleLineConsumer(async (data) => {
  if (data.type !== "git-stash-actions") {
    throw new Error(`Unexpected data type: ${data.type}`)
  }

  const stashes = data.names.filter((stash) => stash !== "")
  if (stashes.length === 0) {
    throw new Error("Stashes must be more then one")
  }

  switch (data.action) {
    case "show": {
      if (data.hashes.length > 1) {
        throw new Error("Stashes must be one")
      }

      await gitShow(data.hashes[0])
      break
    }
    case "diff": {
      if (data.hashes.length > 2) {
        throw new Error("Stashes must be one or two")
      }

      await gitDiff(data.hashes[0], data.hashes[1])
      break
    }
    case "apply": {
      if (data.hashes.length > 1) {
        throw new Error("Stashes must be one")
      }

      await gitStashApply(data.names[0])
      await chainFzfCommand("FzfPreviewGitStashes")
      break
    }
    case "pop": {
      if (data.hashes.length > 1) {
        throw new Error("Stashes must be one")
      }

      await gitStashPop(data.names[0])
      await chainFzfCommand("FzfPreviewGitStashes")
      break
    }
    case "drop": {
      for (const name of data.names) {
        // eslint-disable-next-line no-await-in-loop
        await gitStashDrop(name)
      }
      await chainFzfCommand("FzfPreviewGitStashes")
      break
    }
    case "yank": {
      if (data.hashes.length > 1) {
        throw new Error("Stashes must be one")
      }

      await gitYank(data.hashes[0])
      await chainFzfCommand("FzfPreviewGitStashes")
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

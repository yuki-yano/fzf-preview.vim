import { gitCommit, gitFetch, gitPull, gitPush } from "@/connector/git"
import { chainFzfCommand, createSingleLineConsumer } from "@/fzf/process/consumer"
import { gitConfigModule } from "@/module/git-config"
import { saveStore } from "@/module/persist"
import { dispatch } from "@/store"
import { unreachable } from "@/util/type"

// eslint-disable-next-line complexity
export const execGitActionConsumer = createSingleLineConsumer(async (data) => {
  if (data.type !== "git-actions") {
    throw new Error(`Unexpected data type: ${data.type}`)
  }

  switch (data.action) {
    case "status": {
      await chainFzfCommand("FzfPreviewGitStatus")
      break
    }
    case "branch": {
      await chainFzfCommand("FzfPreviewGitBranches")
      break
    }
    case "log": {
      await chainFzfCommand("FzfPreviewGitLogs")
      break
    }
    case "current-log": {
      await chainFzfCommand("FzfPreviewGitCurrentLogs")
      break
    }
    case "stash": {
      await chainFzfCommand("FzfPreviewGitStashes")
      break
    }
    case "reflog": {
      await chainFzfCommand("FzfPreviewGitReflogs")
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
    case "fetch": {
      await gitFetch()
      break
    }
    case "pull": {
      await gitPull()
      break
    }
    case "toggle --no-verify": {
      dispatch(gitConfigModule.actions.toggleNoVerify())
      await dispatch(saveStore({ modules: ["gitConfig"] }))
      await chainFzfCommand("FzfPreviewGitActions")
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

import {
  gitCheckout,
  gitDeleteBranch,
  gitDiff,
  gitMerge,
  gitRebase,
  gitRebaseInteractive,
  gitRenameBranch,
  gitReset,
  gitYank,
} from "@/connector/git"
import { chainFzfCommand, createSingleLineConsumer } from "@/fzf/process/consumer"
import { unreachable } from "@/util/type"

// eslint-disable-next-line complexity
export const execGitBranchActionConsumer = createSingleLineConsumer(async (data) => {
  if (data.type !== "git-branch-actions") {
    throw new Error(`Unexpected data type: ${data.type}`)
  }

  const branches = data.branches.filter((branch) => branch !== "")
  if (branches.length === 0) {
    throw new Error("Branches must be more then one")
  }

  switch (data.action) {
    case "checkout": {
      if (data.branches.length > 1) {
        throw new Error("Branch must be one")
      }

      await gitCheckout(data.branches[0])
      await chainFzfCommand("FzfPreviewGitBranches")
      break
    }
    case "reset": {
      if (data.branches.length > 1) {
        throw new Error("branches must be one")
      }

      await gitReset(data.branches[0])
      await chainFzfCommand("FzfPreviewGitBranches")
      break
    }
    case "reset --soft": {
      if (data.branches.length > 1) {
        throw new Error("branches must be one")
      }

      await gitReset(data.branches[0], "--soft")
      await chainFzfCommand("FzfPreviewGitBranches")
      break
    }
    case "reset --hard": {
      if (data.branches.length > 1) {
        throw new Error("branches must be one")
      }

      await gitReset(data.branches[0], "--hard")
      await chainFzfCommand("FzfPreviewGitBranches")
      break
    }
    case "diff": {
      if (data.branches.length > 2) {
        throw new Error("Branch must be one or two")
      }

      await gitDiff(data.branches[0], data.branches[1])
      break
    }
    case "merge": {
      if (data.branches.length > 1) {
        throw new Error("Branch must be one")
      }

      await gitMerge(data.branches[0])
      await chainFzfCommand("FzfPreviewGitBranches")
      break
    }
    case "merge --no-ff": {
      if (data.branches.length > 1) {
        throw new Error("Branch must be one")
      }

      await gitMerge(data.branches[0], "--no-ff")
      await chainFzfCommand("FzfPreviewGitBranches")
      break
    }
    case "rebase": {
      if (data.branches.length > 1) {
        throw new Error("Branch must be one")
      }

      await gitRebase(data.branches[0])
      await chainFzfCommand("FzfPreviewGitBranches")
      break
    }
    case "rebase --interactive": {
      if (data.branches.length > 1) {
        throw new Error("Branch must be one")
      }

      await gitRebaseInteractive(data.branches[0])
      break
    }
    case "delete": {
      for (const branch of data.branches) {
        // eslint-disable-next-line no-await-in-loop
        await gitDeleteBranch(branch)
      }
      await chainFzfCommand("FzfPreviewGitBranches")
      break
    }
    case "delete --force": {
      for (const branch of data.branches) {
        // eslint-disable-next-line no-await-in-loop
        await gitDeleteBranch(branch, { name: "--force" })
      }
      await chainFzfCommand("FzfPreviewGitBranches")
      break
    }
    case "rename": {
      if (data.branches.length > 1) {
        throw new Error("Branch must be one")
      }

      await gitRenameBranch(data.branches[0])
      await chainFzfCommand("FzfPreviewGitBranches")
      break
    }
    case "yank": {
      if (data.branches.length > 1) {
        throw new Error("Branch must be one")
      }

      await gitYank(data.branches[0])
      await chainFzfCommand("FzfPreviewGitBranches")
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

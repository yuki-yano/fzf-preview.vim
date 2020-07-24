import { execFzfCommand } from "@/connector/fzf"
import { gitCheckout } from "@/connector/git"
import { vimEchoMessage } from "@/connector/util"
import { createBulkLineConsumer } from "@/fzf/process/consumer"

export const gitCheckoutConsumer = createBulkLineConsumer(async (dataList) => {
  if (dataList.length > 1) {
    throw new Error("The git checkout should not be multiple lines.")
  }

  const data = dataList[0]

  switch (data.type) {
    case "git-branch": {
      await gitCheckout(data.name)
      await vimEchoMessage(`git checkout ${data.name}`)
      break
    }
    case "git-log": {
      await gitCheckout(data.hash)
      await vimEchoMessage(`git checkout ${data.hash}`)
      break
    }

    default: {
      throw new Error(`Unexpected data type: ${data.type}`)
    }
  }

  await execFzfCommand("FzfPreviewGitBranches")
})

import { IS_GIT_DIRECTORY_COMMAND } from "@/const/system"
import { execCommand } from "@/system/command"

export const projectRoot = () => {
  if (!isGitDirectory()) {
    throw new Error("The current directory is not a git project")
  }

  const { stdout } = execCommand(IS_GIT_DIRECTORY_COMMAND)
  return stdout
}

export const isGitDirectory = () => {
  const { status } = execCommand(IS_GIT_DIRECTORY_COMMAND)
  return typeof status === "number" && status === 0
}

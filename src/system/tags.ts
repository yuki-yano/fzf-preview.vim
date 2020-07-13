import { BUFFER_TAGS_COMMAND } from "@/const/system"
import { execSyncCommand } from "@/system/command"

export const getBufferTags = (filePath: string): Array<string> => {
  const { stdout, stderr, status } = execSyncCommand(`${BUFFER_TAGS_COMMAND} ${filePath}`)

  if (stderr !== "" || status !== 0) {
    throw new Error(`Failed buffer tags command: "${BUFFER_TAGS_COMMAND} ${filePath}"`)
  }

  return stdout.split("\n")
}

import { logger } from "neovim/lib/utils/logger"

import { BUFFER_TAGS_COMMAND } from "@/const/system"
import { execCommand } from "@/system/command"

export const getBufferTags = (filePath: string): Array<string> => {
  const { stdout, stderr, status } = execCommand(`${BUFFER_TAGS_COMMAND} ${filePath}`)

  if (stderr !== "" || status !== 0) {
    logger.error(stderr)
    throw new Error(`Failed buffer tags command: "${BUFFER_TAGS_COMMAND} ${filePath}"`)
  }

  return stdout.split("\n")
}

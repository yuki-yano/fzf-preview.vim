import fs from "fs"
import { v4 as uuidv4 } from "uuid"

import { fzfOptionsToString } from "@/fzf/option/convert"
import { pluginCall, pluginCommand } from "@/plugin"
import type { FzfOptions, ResourceLine, ResourceLines } from "@/type"

const PREFIX_SPACE = "   "

type Parameter = {
  resourceLines: ResourceLines
  handler: string
  options: FzfOptions
}

export const resourceLineToFzfLine = (resourceLine: ResourceLine): string => {
  return `${encodeURIComponent(JSON.stringify(resourceLine.data))} ${resourceLine.displayText}`
}

export const fzfRunner = async ({ resourceLines, handler, options }: Parameter): Promise<void> => {
  await pluginCommand("nohlsearch")
}

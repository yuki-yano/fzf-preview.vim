import type { FzfCommandName, HandlerName } from "@/type"

type CommandWithHandler = {
  command: FzfCommandName
  handler: HandlerName
}

export const fzfPreviewProjectFiles: CommandWithHandler = {
  command: "TSFzfPreviewProjectFiles",
  handler: "FzfPreviewHandleResource"
} as const

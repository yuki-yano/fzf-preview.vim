import type { HandlerName } from "@/type"
import { openFileHandler } from "@/fzf/handler/open-file"

type Handlers = {
  [key in HandlerName]: (lines: Array<string>) => void
}

export const handlers: Handlers = {
  FzfPreviewHandleResource: openFileHandler
} as const

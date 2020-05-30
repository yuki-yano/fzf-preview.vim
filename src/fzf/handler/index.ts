import type { HandlerName } from "../../type"
import { baseHandler } from "./base"

type Handlers = {
  [key in HandlerName]: (lines: Array<string>) => void
}

export const handlers: Handlers = {
  FzfPreviewHandleResource: baseHandler
}

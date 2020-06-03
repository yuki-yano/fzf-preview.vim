import { createOpenFileProcessor } from "@/fzf/processor/open-file"

export const baseHandler = (lines: Array<string>) => {
  const key = lines.shift() as string
  const openFileProcessor = createOpenFileProcessor()
  openFileProcessor[key](lines)
}

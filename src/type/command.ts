import type { cocCommandDefinition } from "@/association/coc-command"

export type FzfPreviewCommandList = typeof cocCommandDefinition[number]["commandName"]

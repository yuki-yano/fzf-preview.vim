import { commandDefinition } from "@/association/command"

export type FzfPreviewCommandList = typeof commandDefinition[number]["commandName"]

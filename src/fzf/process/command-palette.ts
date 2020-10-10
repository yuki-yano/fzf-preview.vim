import { editCommandPaletteConsumer, execCommandPaletteConsumer } from "@/fzf/process/consumer/command-palette"
import { createProcessCreator } from "@/fzf/process/process"
import type { Processes } from "@/type"

const createCommandPaletteProcess = createProcessCreator("command-palette")

export const commandPaletteProcesses: Processes = [
  createCommandPaletteProcess("enter", execCommandPaletteConsumer),
  createCommandPaletteProcess("ctrl-e", editCommandPaletteConsumer),
]

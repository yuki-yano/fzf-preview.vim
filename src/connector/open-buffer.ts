import { pluginCommand } from "@/plugin"
import type { OpenCommand } from "@/type"

export const openBufnr = async (openCommand: OpenCommand, bufnr: number): Promise<void> => {
  await pluginCommand(`execute 'silent ${openCommand} | buffer ${bufnr}'`)
}

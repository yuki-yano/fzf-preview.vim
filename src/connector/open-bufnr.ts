import { pluginCommand } from "@/plugin"
import type { OpenCommand } from "@/type"

export const openBufnr = async (openCommand: OpenCommand, bufnr: string): Promise<void> => {
  if (openCommand !== "edit") {
    await pluginCommand(`execute 'silent ${openCommand} | buffer ${bufnr}'`)
  }
  await pluginCommand(`execute 'silent buffer ${bufnr}'`)
}

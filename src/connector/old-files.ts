import { pluginGetVvar } from "@/plugin"

export const getOldFiles = async (): Promise<ReadonlyArray<string>> =>
  (await pluginGetVvar("oldfiles")) as ReadonlyArray<string>

import { pluginGetVvar } from "@/plugin"
import type { ResourceLines } from "@/type"

export const getOldFiles = async (): Promise<ResourceLines> => (await pluginGetVvar("oldfiles")) as ResourceLines

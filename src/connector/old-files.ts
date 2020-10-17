import { pluginGetVvar } from "@/plugin"

export const getOldFiles = async (): Promise<Array<string>> => (await pluginGetVvar("oldfiles")) as Array<string>

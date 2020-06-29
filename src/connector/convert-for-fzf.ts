import { pluginCall } from "@/plugin"
import type { ResourceLines } from "@/type"

type Options = {
  enableConvertForFzf: boolean
  enableDevIcons: boolean
  enablePostProcessCommand: boolean
}

export const convertForFzf = async (lines: ResourceLines, options: Options): Promise<ResourceLines> => {
  const { enableConvertForFzf, enableDevIcons, enablePostProcessCommand } = options

  if (!enableConvertForFzf) {
    return lines
  }

  return (await pluginCall("fzf_preview#remote#converter#convert_for_fzf", [
    lines,
    enableDevIcons,
    enablePostProcessCommand,
  ])) as Promise<ResourceLines>
}

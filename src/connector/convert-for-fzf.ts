import { pluginCall } from "@/plugin"
import type { ResourceLines } from "@/type"

type Options = {
  disablePostProcessCommand?: boolean
}

export const convertForFzf = async (lines: ResourceLines, options?: Options): Promise<ResourceLines> => {
  const variadicArguments: Array<boolean> = []

  if (options && options.disablePostProcessCommand) {
    variadicArguments.push(true)
  }

  return (await pluginCall("fzf_preview#remote#converter#convert_for_fzf", [lines, ...variadicArguments])) as Promise<
    ResourceLines
  >
}

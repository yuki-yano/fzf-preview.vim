import { fzfOptionsToString } from "@/fzf/option/convert"
import { pluginCall } from "@/plugin"
import type { FzfOptions, ResourceLine, ResourceLines } from "@/type"

type Parameter = {
  resourceLines: ResourceLines
  handler: string
  options: FzfOptions
}

const resourceLineToFzfLine = (resourceLine: ResourceLine): string => {
  return `   ${encodeURIComponent(JSON.stringify(resourceLine.data))} ${resourceLine.displayText}`
}

export const fzfRunner = async ({ resourceLines, handler, options }: Parameter): Promise<void> => {
  await pluginCall("fzf_preview#remote#runner#fzf_run", {
    source: resourceLines.map((line) => resourceLineToFzfLine(line)),
    handler,
    options: fzfOptionsToString(options),
    environment: PLUGIN.ENV,
  })
}

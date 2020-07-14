import { fzfOptionsToString } from "@/fzf/option/convert"
import { pluginCall } from "@/plugin"
import type { FzfOptions, ResourceLines } from "@/type"

type Parameter = {
  source: ResourceLines
  handler: string
  options: FzfOptions
}

export const fzfRunner = async ({ source, handler, options }: Parameter): Promise<void> => {
  await pluginCall("fzf_preview#remote#runner#fzf_run", {
    source,
    handler,
    options: fzfOptionsToString(options),
    environment: PLUGIN.ENV,
  })
}

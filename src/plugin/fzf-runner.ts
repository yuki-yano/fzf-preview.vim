import { fzfOptionsToString } from "@/fzf/option/convert"
import { environmentSelector } from "@/module/selector/environment"
import { pluginCall } from "@/plugin"
import type { Environment, FzfOptions, ResourceLines } from "@/type"

type Parameter = {
  source: ResourceLines
  handler: string
  options: FzfOptions
}

export const fzfRunner = async ({ source, handler, options }: Parameter): Promise<void> => {
  const environment = environmentSelector().env as Environment
  await pluginCall("fzf_preview#remote#runner#fzf_run", {
    source,
    handler,
    options: fzfOptionsToString(options),
    environment,
  })
}

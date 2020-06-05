import { pluginCall } from "@/plugin"
import { fzfOptionsToString } from "@/fzf/option/convert"
import type { FzfOptions } from "@/type"

type Parameter = {
  source: Array<string>
  handler: string
  options: FzfOptions
}

export const fzfRunner = ({ source, handler, options }: Parameter) => {
  pluginCall("fzf_preview#remote#runner#fzf_run", {
    source,
    handler,
    options: fzfOptionsToString(options)
  })
}

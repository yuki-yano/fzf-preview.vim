import { plugin } from "@/plugin"
import { fzfOptionsToString } from "@/fzf/option/convert"
import type { FzfOptions } from "@/type"

type Parameter = {
  source: Array<string>
  handler: string
  options: FzfOptions
}

export const fzfRunner = ({ source, handler, options }: Parameter) => {
  plugin.nvim.call("fzf_preview#ts_runner#fzf_run", {
    source,
    handler,
    options: fzfOptionsToString(options)
  })
}

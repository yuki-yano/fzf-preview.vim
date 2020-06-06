import { pluginCall } from "@/plugin"

type Args = {
  processorsFunctionName: string
  expectKey: string
  lines: Array<string>
  options: {
    processorsName?: string
  }
}

export const processorRunner = ({ processorsFunctionName, expectKey, lines, options }: Args) => {
  pluginCall("fzf_preview#remote#handler_to_processor#call_funcref_or_fallback_default_processor", [
    processorsFunctionName,
    expectKey,
    lines,
    options.processorsName
  ])
}

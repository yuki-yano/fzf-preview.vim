import { pluginCall } from "@/plugin"

type Args = {
  processesFunctionName: string
  expectKey: string
  lines: Array<string>
  processesName?: string
}

export const processesRunner = ({ processesFunctionName, expectKey, lines, processesName }: Args) => {
  pluginCall("fzf_preview#remote#handler_to_process#call_funcref_or_fallback_default_process", [
    processesFunctionName,
    expectKey,
    lines,
    processesName
  ])
}

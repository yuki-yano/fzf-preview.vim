import { pluginCall } from "@/plugin"
import type { ConvertedLines } from "@/type"

type Args = {
  processesFunctionName: string
  expectKey: string
  lines: ConvertedLines
  processesName?: string
}

export const processesRunner = async ({
  processesFunctionName,
  expectKey,
  lines,
  processesName
}: Args): Promise<void> => {
  await pluginCall("fzf_preview#remote#handler_to_process#call_funcref_or_fallback_default_process", [
    processesFunctionName,
    expectKey,
    lines,
    processesName
  ])
}

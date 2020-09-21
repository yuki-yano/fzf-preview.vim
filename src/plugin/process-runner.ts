import { pluginCall } from "@/plugin"
import type { CallbackLines, UserProcesses } from "@/type"

type Args = {
  processesFunctionName: string
  expectKey: string
  lines: CallbackLines
  userProcesses?: UserProcesses
}

const getProcessesName = (userProcesses?: UserProcesses) => {
  if (userProcesses?.type === "global_variable") {
    return userProcesses.value
  } else if (userProcesses?.type === "custom_processes_variable") {
    return `fzf_preview_custom_processes["${userProcesses.value}"]`
  }

  return undefined
}

export const processesRunner = async ({
  processesFunctionName,
  expectKey,
  lines,
  userProcesses,
}: Args): Promise<void> => {
  await pluginCall("fzf_preview#remote#handler_to_process#call_funcref_or_fallback_default_process", [
    PLUGIN.ENV,
    processesFunctionName,
    expectKey,
    lines,
    getProcessesName(userProcesses),
  ])
}

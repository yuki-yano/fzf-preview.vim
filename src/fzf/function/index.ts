import { processesDefinition } from "@/fzf/process"
import { createProcessFunctionName } from "@/fzf/util"
import type { ProcessesName } from "@/type"

export const getDefaultProcesses = (processesName: string): { [key: string]: string } => {
  const targetProcessesDefinition = processesDefinition.find((define) => define.name === processesName)
  if (targetProcessesDefinition == null) {
    throw new Error(`Processes not found: "${processesName}"`)
  }

  return targetProcessesDefinition.processes.reduce(
    (acc: { [key: string]: string }, cur) => ({
      ...acc,
      [cur.key]: createProcessFunctionName(processesName as ProcessesName, cur.key),
    }),
    {}
  )
}

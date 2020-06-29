import { dispatchResumeQuery } from "@/connector/resume"
import { processesDefinition } from "@/fzf/process"
import { createProcessFunctionName } from "@/fzf/util"
import { pluginRegisterFunction } from "@/plugin"
import { ProcessesName } from "@/type"

export const registerFunction = (): void => {
  pluginRegisterFunction(
    "FzfPreviewGetDefaultProcessor",
    ([processesName]: Array<string>) => {
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
    },
    { sync: true }
  )

  pluginRegisterFunction("FzfPreviewDispatchResumeQuery", dispatchResumeQuery, { sync: false })
}

import { createProcessFunctionName } from "@/fzf/util"
import type { CreateProcess, ResourceData } from "@/type"

export const createProcess: CreateProcess = (processesName) => (expectKey, lineConsumer) => ({
  name: createProcessFunctionName(processesName, expectKey),
  key: expectKey,
  execute: async (dataList: Array<ResourceData>) => {
    if (lineConsumer.kind === "single") {
      for (const data of dataList) {
        // eslint-disable-next-line no-await-in-loop
        await lineConsumer.consume(data)
      }
    } else {
      await lineConsumer.consume(dataList)
    }
  },
})

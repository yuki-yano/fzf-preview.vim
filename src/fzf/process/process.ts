import { createProcessFunctionName } from "@/fzf/util"
import type { CreateProcessCreator, ResourceData } from "@/type"
import { unreachable } from "@/util/type"

export const createProcessCreator: CreateProcessCreator = (processesName) => (expectKey, lineConsumer) => ({
  name: createProcessFunctionName(processesName, expectKey),
  key: expectKey,
  execute: async (dataList: ReadonlyArray<ResourceData>) => {
    switch (lineConsumer.kind) {
      case "single": {
        for (const data of dataList) {
          // eslint-disable-next-line no-await-in-loop
          await lineConsumer.consume(data)
        }
        break
      }
      case "bulk": {
        await lineConsumer.consume(dataList)
        break
      }
      default: {
        unreachable(lineConsumer)
      }
    }
  },
})

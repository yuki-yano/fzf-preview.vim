import { createProcessFunctionName } from "@/fzf/util"
import type { CreateProcess } from "@/type"

export const createProcess: CreateProcess = (processesName) => (expectKey, lineConsumer) => ({
  name: createProcessFunctionName(processesName, expectKey),
  key: expectKey,
  execute: async (lines) => {
    if (lineConsumer.kind === "single") {
      for (const line of lines) {
        // eslint-disable-next-line no-await-in-loop
        await lineConsumer.consume(line)
      }
    } else {
      await lineConsumer.consume(lines)
    }
  },
})

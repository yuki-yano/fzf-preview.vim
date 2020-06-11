import type { CreateProcess } from "@/type"

export const createProcess: CreateProcess = (lineConsumer) => ({
  execute: async (lines) => {
    if (lineConsumer.kind === "single") {
      for (const line of lines) {
        // eslint-disable-next-line no-await-in-loop
        await lineConsumer.consume(line)
      }
    } else {
      await lineConsumer.consume(lines)
    }
  }
})

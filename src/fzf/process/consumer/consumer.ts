import type { ConvertedLine, ConvertedLines } from "@/type"

export const createSingleLineConsumer = (consume: (line: ConvertedLine) => Promise<void>) =>
  ({
    consume,
    kind: "single",
  } as const)

export const createBulkLineConsumer = (consume: (lines: ConvertedLines) => Promise<void>) =>
  ({
    consume,
    kind: "bulk",
  } as const)

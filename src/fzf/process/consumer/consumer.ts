import type { SelectedLine, SelectedLines } from "@/type"

export const createSingleLineConsumer = (consume: (line: SelectedLine) => Promise<void>) =>
  ({
    consume,
    kind: "single"
  } as const)

export const createBulkLineConsumer = (consume: (lines: SelectedLines) => Promise<void>) =>
  ({
    consume,
    kind: "bulk"
  } as const)

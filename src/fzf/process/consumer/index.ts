import type { CallbackLine, ResourceData } from "@/type"

export const decodeLine = (callbackLine: CallbackLine): ResourceData => {
  return JSON.parse(decodeURIComponent(callbackLine.trim().split(" ")[0])) as ResourceData
}

export const createSingleLineConsumer = (consume: (data: ResourceData) => Promise<void>) =>
  ({
    consume,
    kind: "single",
  } as const)

export const createBulkLineConsumer = (consume: (dataList: Array<ResourceData>) => Promise<void>) =>
  ({
    consume,
    kind: "bulk",
  } as const)

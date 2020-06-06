import type { FzfPreviewCommandList } from "@/type"

export const createProcessorsFunctionName = (commandName: FzfPreviewCommandList, expectKey: string) =>
  `${commandName}_${expectKey.replace("-", "_")}`

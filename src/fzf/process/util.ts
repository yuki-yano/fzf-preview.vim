import type { FzfPreviewCommandList } from "@/type"

export const createProcessesFunctionName = (commandName: FzfPreviewCommandList, expectKey: string) =>
  `${commandName}_${expectKey.replace("-", "_")}`

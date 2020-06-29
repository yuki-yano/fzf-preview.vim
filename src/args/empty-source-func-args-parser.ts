import type { SourceFuncArgs } from "@/type"

export const parseEmptySourceFuncArgs = (_args: string): SourceFuncArgs => {
  return {
    args: [],
    extraArgs: [],
  }
}

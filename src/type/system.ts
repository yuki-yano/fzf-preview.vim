import type { ReadonlyDeep } from "type-fest"

export type CommandResult = ReadonlyDeep<{
  stdout: string
  stderr: string
  status: number | null
}>

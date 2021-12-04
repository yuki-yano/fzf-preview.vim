import type { ReadonlyDeep } from "type-fest"

export type VimBuffer = ReadonlyDeep<{
  fileName: string
  bufnr: number
  isCurrent: boolean
  isAlternate: boolean
  isModified: boolean
}>

import type { SelectedLine } from "@/type"

export const createConvertDropPrefix = (prefixLength: number): ((line: SelectedLine) => SelectedLine) => (
  line: SelectedLine
): SelectedLine => line.slice(prefixLength)

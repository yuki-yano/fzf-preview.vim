import type { SelectedLine } from "@/type"

export const createConvertDropPrefix = (prefixLength: number) => (line: SelectedLine) => line.slice(prefixLength)

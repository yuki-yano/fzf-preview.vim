import type { SelectedLine } from "@/type"

export const createSplitConverter = (splitter: string): ((line: SelectedLine) => Array<string>) => (
  line: SelectedLine
) => line.split(splitter)

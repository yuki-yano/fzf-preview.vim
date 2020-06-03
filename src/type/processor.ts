export type Processor = {
  [key: string]: (lines: Array<string>) => void
}

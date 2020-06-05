export type Processors = {
  [key: string]: (lines: Array<string>) => void
}

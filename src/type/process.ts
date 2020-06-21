export type ConvertedLine = string
export type ConvertedLines = Array<ConvertedLine>

export type Processes = {
  [key: string]: Process
}

export type Process = {
  execute: (lines: ConvertedLines) => void | Promise<void>
}

export type LineConsumer = SingleLineConsumer | BulkLineConsumer
export type SingleLineConsumer = {
  consume: (line: ConvertedLine) => Promise<void>
  kind: "single"
}
export type BulkLineConsumer = {
  consume: (lines: ConvertedLines) => Promise<void>
  kind: "bulk"
}

export type CreateProcess = (lineConsumer: LineConsumer) => Process

export type OpenCommand = "edit" | "split" | "vsplit" | "tabedit"

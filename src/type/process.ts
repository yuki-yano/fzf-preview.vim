export type SelectedLine = string
export type SelectedLines = Array<SelectedLine>

export type Processes = {
  [key: string]: Process
}

export type Process = {
  execute: (lines: SelectedLines) => void | Promise<void>
}

export type LineConsumer = SingleLineConsumer | BulkLineConsumer
export type SingleLineConsumer = {
  consume: (line: SelectedLine) => Promise<void>
  kind: "single"
}
export type BulkLineConsumer = {
  consume: (lines: SelectedLines) => Promise<void>
  kind: "bulk"
}

export type CreateProcess = (lineConsumer: LineConsumer) => Process

export type OpenCommand = "edit" | "split" | "vsplit" | "tabedit"

export * from "@/fzf/processor/process/process"
export * from "@/fzf/processor/process/open-file"
export * from "@/fzf/processor/process/export-quickfix"

type ConvertLine = (line: string) => string
type Process = (lines: Array<string>) => void | Promise<void>

export const processorCreator = (convertLine: ConvertLine) => (process: Process) => (lines: Array<string>) =>
  process(lines.map((line) => convertLine(line)))

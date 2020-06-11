export const createEachProcess = (process: (line: string) => void) => async (lines: Array<string>) => {
  for await (const line of lines) {
    process(line)
  }
}

export const createOnceProcess = (process: (lines: Array<string>) => void) => (lines: Array<string>) => process(lines)

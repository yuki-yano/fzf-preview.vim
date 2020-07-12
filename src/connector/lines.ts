import { globalVariableSelector } from "@/module/selector/vim-variable"
import { execCommand } from "@/system/command"

export const execLines = (filePath: string): Array<string> => {
  const linesCommand = globalVariableSelector("fzfPreviewLinesCommand") as string
  const { stdout, stderr, status } = execCommand(`${linesCommand} ${filePath}`)

  if (stderr !== "" || status !== 0) {
    throw new Error(`Failed lines command: "${linesCommand}"`)
  }

  return stdout.split("\n").filter((line) => line !== "")
}

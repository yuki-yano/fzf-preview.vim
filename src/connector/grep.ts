import { globalVariableSelector } from "@/module/selector/vim-variable"
import { execCommand } from "@/system/command"
import type { ResourceLines } from "@/type"

export const execGrep = (args: string): ResourceLines => {
  const grepCommand = globalVariableSelector("fzfPreviewGrepCmd") as string
  const { stdout, stderr, status } = execCommand(`${grepCommand} ${args}`)

  if (stderr !== "" || status !== 0) {
    throw new Error(`Failed grep command: "${grepCommand} ${args}"`)
  }

  return stdout.split("\n").filter((line) => line !== "")
}

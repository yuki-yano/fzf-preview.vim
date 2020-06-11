import { createEachProcess } from "@/fzf/processor/process/process"
import { pluginCommand } from "@/plugin"

type OpenCommand = "edit" | "split" | "vsplit" | "tabedit"

const createOpenFile = (openCommand: OpenCommand) => (line: string) => {
  pluginCommand(`execute 'silent ${openCommand} ${line}'`)
}

export const editProcess = createEachProcess(createOpenFile("edit"))
export const splitProcess = createEachProcess(createOpenFile("split"))
export const vsplitProcess = createEachProcess(createOpenFile("vsplit"))
export const tabeditProcess = createEachProcess(createOpenFile("tabedit"))

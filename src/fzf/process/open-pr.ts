import { openPr } from "@/fzf/process/consumer"
import { createProcess } from "@/fzf/process/process"
import type { Processes } from "@/type"

const createOpenPrProcess = createProcess("open-pr")

export const openPrProcesses: Processes = [createOpenPrProcess("enter", openPr)]

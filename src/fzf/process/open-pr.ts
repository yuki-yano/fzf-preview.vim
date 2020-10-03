import { openPr } from "@/fzf/process/consumer/open-pr"
import { createProcessCreator } from "@/fzf/process/process"
import type { Processes } from "@/type"

const createOpenPrProcess = createProcessCreator("open-pr")

export const openPrProcesses: Processes = [createOpenPrProcess("enter", openPr)]

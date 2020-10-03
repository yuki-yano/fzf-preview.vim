import { setRegister } from "@/fzf/process/consumer/register"
import { createProcessCreator } from "@/fzf/process/process"
import type { Processes } from "@/type"

const createRegisterProcess = createProcessCreator("register")

export const registerProcesses: Processes = [createRegisterProcess("enter", setRegister)]

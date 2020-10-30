import type { State } from "@/module/execute-command"
import { store } from "@/store"

export const executeCommandSelector = (): State => store.getState().executeCommand

import { store } from "@/store"
import type { FzfCommandName } from "@/type"

export const resumeSelector = (commandName: FzfCommandName): string | undefined => store.getState().resume[commandName]

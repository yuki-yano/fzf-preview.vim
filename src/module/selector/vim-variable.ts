import { store } from "@/store"
import type { GlobalVariableName } from "@/type"

export const globalVariableSelector = (name: GlobalVariableName) => store.getState().vimVariable.global[name]

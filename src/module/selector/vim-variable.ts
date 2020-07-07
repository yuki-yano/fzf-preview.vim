import { VimValue } from "neovim/lib/types/VimValue"

import { store } from "@/store"
import type { GlobalVariableName } from "@/type"

export const globalVariableSelector = (name: GlobalVariableName): VimValue => store.getState().vimVariable.global[name]

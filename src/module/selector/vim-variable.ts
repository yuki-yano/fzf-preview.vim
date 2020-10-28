import type { VimValue } from "neovim/lib/types/VimValue"

import { store } from "@/store"
import type { GlobalVariableName, VimOptionName } from "@/type"

export const globalVariableSelector = (name: GlobalVariableName): VimValue => store.getState().vimVariable.global[name]
export const vimOptionsSelector = (name: VimOptionName): VimValue => store.getState().vimVariable.options[name]

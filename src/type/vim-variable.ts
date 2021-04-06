import type { VimValue } from "neovim/lib/types/VimValue"
import type { ReadonlyDeep } from "type-fest"

import type { vimOptions, vimVariableAssociation } from "@/association/vim-variable"

export type GlobalVariableName = keyof typeof vimVariableAssociation
export type GlobalVariables = ReadonlyDeep<{ [key in GlobalVariableName]: VimValue }>
export type VimOptionName = typeof vimOptions[number]

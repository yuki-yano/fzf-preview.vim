import type { vimOptions, vimVariableAssociation } from "@/association/vim-variable"
import type { valueof } from "@/type/util"

export type GlobalVariableName = keyof typeof vimVariableAssociation
export type VimVariableName = valueof<typeof vimVariableAssociation>
export type VimOptionName = typeof vimOptions[number]

import { vimVariableAssociation } from "@/association/vim-variable"
import { valueof } from "@/type/util"

export type GlobalVariableName = keyof typeof vimVariableAssociation
export type VimVariableName = valueof<typeof vimVariableAssociation>

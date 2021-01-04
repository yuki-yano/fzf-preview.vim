import { vimVariableModule } from "@/module/vim-variable"
import { pluginCall } from "@/plugin"
import { dispatch } from "@/store"
import type { GlobalVariableName, GlobalVariables } from "@/type"

export const syncVimVariable = async (): Promise<void> => {
  const { actions } = vimVariableModule
  const variables = await (pluginCall("fzf_preview#remote#variable#get_global_variables") as Promise<GlobalVariables>)

  Object.entries(variables).forEach(([name, value]) => {
    dispatch(actions.setGlobalVariable({ name: name as GlobalVariableName, value }))
  })
}

export const syncVimOptions = async (): Promise<void> => {
  const columns = (await pluginCall("fzf_preview#remote#util#get_columns")) as number
  dispatch(vimVariableModule.actions.setOption({ name: "columns", value: columns }))
}

import { combineReducers } from "@reduxjs/toolkit"

import { vimVariableModule } from "@/module/vim-variable"

export type RootState = ReturnType<typeof rootReducer>

export const rootReducer = combineReducers({
  vimVariable: vimVariableModule.reducer
})

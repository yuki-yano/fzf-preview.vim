import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"

import { executeCommandModule } from "@/module/execute-command"
import { resumeModule } from "@/module/resume"
import { vimVariableModule } from "@/module/vim-variable"

const setupStore = () => {
  const store = configureStore({
    reducer: {
      vimVariable: vimVariableModule.reducer,
      executeCommand: executeCommandModule.reducer,
      resume: resumeModule.reducer
    },
    middleware: getDefaultMiddleware()
  })

  return store
}

export const store = setupStore()
export const { dispatch } = store

export type RootState = ReturnType<typeof store.getState>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = typeof store.dispatch

import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"

import { executeCommandModule } from "@/module/execute-command"
import { gitConfigModule } from "@/module/git-config"
import { resumeModule } from "@/module/resume"
import { sessionModule } from "@/module/session"
import { vimVariableModule } from "@/module/vim-variable"

const setupStore = () => {
  const store = configureStore({
    reducer: {
      vimVariable: vimVariableModule.reducer,
      executeCommand: executeCommandModule.reducer,
      resume: resumeModule.reducer,
      session: sessionModule.reducer,
      gitConfig: gitConfigModule.reducer,
    },
    middleware: getDefaultMiddleware(),
  })

  return store
}

export const store = setupStore()
export const { dispatch } = store

export type RootState = ReturnType<typeof store.getState>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = typeof store.dispatch

import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"

import { cacheModule } from "@/module/cache"
import { environmentModule } from "@/module/environment"
import { executeCommandModule } from "@/module/execute-command"
import { resumeModule } from "@/module/resume"
import { vimVariableModule } from "@/module/vim-variable"

const setupStore = () => {
  const store = configureStore({
    reducer: {
      environment: environmentModule.reducer,
      vimVariable: vimVariableModule.reducer,
      executeCommand: executeCommandModule.reducer,
      cache: cacheModule.reducer,
      resume: resumeModule.reducer,
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

import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"

import { neovimStoreMiddleware } from "@/middleware/neovim-store"
import { persistModule } from "@/module/persist"
import { vimVariableModule } from "@/module/vim-variable"
import { executeCommandModule } from "@/module/execute-command"

export type RootState = ReturnType<typeof store.getState>
export type Store = ReturnType<typeof setupStore>

const setupStore = () => {
  const middlewares = getDefaultMiddleware()
  middlewares.push(neovimStoreMiddleware)

  const store = configureStore({
    reducer: {
      persist: persistModule.reducer,
      vimVariable: vimVariableModule.reducer,
      executeCommand: executeCommandModule.reducer
    },
    middleware: middlewares
  })

  return store
}

export const store = setupStore()
export const { dispatch } = store

import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"

import { vimVariableModule } from "@/module/vim-variable"

export type RootState = ReturnType<typeof store.getState>
export type Store = ReturnType<typeof setupStore>

const setupStore = () => {
  const store = configureStore({
    reducer: {
      vimVariable: vimVariableModule.reducer
    },
    middleware: getDefaultMiddleware()
  })

  return store
}

export const store = setupStore()
export const { dispatch } = store

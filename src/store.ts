import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"

import { rootReducer } from "@/reducer"

export type Store = ReturnType<typeof setupStore>

const setupStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware()
  })

  return store
}

export const store = setupStore()
export const { dispatch } = store

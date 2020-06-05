import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = {} as const

export const persistModule = createSlice({
  name: "persist",
  initialState,
  reducers: {
    restoreStore: (state, _action: PayloadAction<undefined>) => state,
    persistStore: (state, _action: PayloadAction<undefined>) => state
  }
})

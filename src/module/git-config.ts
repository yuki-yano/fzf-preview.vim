import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"

import { GIT_CONFIG } from "@/const/module"

export type State = {
  noVerify: boolean
}

const initialState: State = {
  noVerify: false,
}

export const gitConfigModule = createSlice({
  name: GIT_CONFIG,
  initialState,
  reducers: {
    restore: (state, { payload }: PayloadAction<State | undefined>) => {
      if (payload != null) {
        state.noVerify = payload.noVerify
      }
    },
    toggleNoVerify: (state) => {
      state.noVerify = !state.noVerify
    },
  },
})

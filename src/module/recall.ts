import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"

import { RECALL } from "@/const/module"

export type State = {
  grepArgs: string
}

const initialState: State = {
  grepArgs: ".",
}

export const recallModule = createSlice({
  name: RECALL,
  initialState,
  reducers: {
    restore: (state, { payload }: PayloadAction<State | undefined>) => {
      if (payload) {
        return { ...state, ...payload }
      }

      return state
    },
    setGrepArgs: (state, { payload }: PayloadAction<{ grepArgs: string }>) => {
      const { grepArgs } = payload
      state.grepArgs = grepArgs
    },
  },
})

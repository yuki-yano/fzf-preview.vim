import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { ENVIRONMENT } from "@/const/module"
import type { Environment } from "@/type"

export type State = {
  env?: Environment
}

const initialState: State = {}

export const environmentModule = createSlice({
  name: ENVIRONMENT,
  initialState,
  reducers: {
    restore: (state, { payload }: PayloadAction<State | undefined>) => {
      if (payload) {
        return { ...state, ...payload }
      }
      return state
    },
    setEnvironment: (state, { payload }: PayloadAction<{ environment: Environment }>) => {
      state.env = payload.environment
    },
  },
})

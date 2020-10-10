import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { CACHE } from "@/const/module"

export type State = {
  projectRoot: string
}

const initialState: State = {
  projectRoot: "",
}

export const cacheModule = createSlice({
  name: CACHE,
  initialState,
  reducers: {
    restore: (state, { payload }: PayloadAction<State | undefined>) => {
      if (payload) {
        return { ...state, ...payload }
      }

      return state
    },
    // TODO: unnecessary project root cache
    setProjectRoot: (state, { payload }: PayloadAction<{ projectRoot: string }>) => {
      state.projectRoot = payload.projectRoot
    },
  },
})

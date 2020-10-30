import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"

import { RESUME } from "@/const/module"
import type { FzfCommandName } from "@/type"

export type State = {
  [commandName in FzfCommandName]?: string
}

const initialState: State = {}

export const resumeModule = createSlice({
  name: RESUME,
  initialState,
  reducers: {
    restore: (state, { payload }: PayloadAction<State | undefined>) => {
      if (payload) {
        return { ...state, ...payload }
      }

      return state
    },
    setQuery: (state, { payload }: PayloadAction<{ commandName: FzfCommandName; query: string }>) => {
      const { commandName, query } = payload
      state[commandName] = query
    },
  },
})

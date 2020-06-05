import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import type { FzfPreviewCommandList } from "@/type"

type State = {
  commandName?: FzfPreviewCommandList
}

const initialState: State = {
  commandName: undefined
}

export const executeCommandModule = createSlice({
  name: "execute-command",
  initialState,
  reducers: {
    restore: (state, { payload }: PayloadAction<State | undefined>) => {
      if (payload) {
        state.commandName = payload.commandName
      }
    },
    setExecuteCommand: (state, { payload }: PayloadAction<{ commandName: FzfPreviewCommandList }>) => {
      state.commandName = payload.commandName
    }
  }
})

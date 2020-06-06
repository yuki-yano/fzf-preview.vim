import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import type { FzfPreviewCommandList } from "@/type"
import type { Store } from "@/store"

type State = {
  commandName?: FzfPreviewCommandList
  options: {
    processorsName?: string
  }
}

const initialState: State = {
  commandName: undefined,
  options: {}
}

export const executeCommandModule = createSlice({
  name: "execute-command",
  initialState,
  reducers: {
    restore: (state, { payload }: PayloadAction<State | undefined>) => {
      if (payload) {
        return { ...state, ...payload }
      }
      return state
    },
    setExecuteCommand: (
      state,
      {
        payload: { commandName, options = {} }
      }: PayloadAction<{ commandName: FzfPreviewCommandList; options: State["options"] }>
    ) => {
      state.commandName = commandName
      state.options = options
    }
  }
})

export const createExecuteCommandSelector = (store: Store) => () => store.getState().executeCommand

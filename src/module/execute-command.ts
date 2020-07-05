import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { VimValue } from "neovim/lib/types/VimValue"

import { EXECUTE_COMMAND } from "@/const/module"
import type { FzfPreviewCommandList, UserProcesses } from "@/type"

export type State = {
  commandName?: FzfPreviewCommandList
  options: {
    userProcesses?: UserProcesses
    enableDevIcons: VimValue
    currentFilePath: string
  }
  extra: {
    commandGrep?: {
      defaultQuery: string
    }
  }
}

const initialState: State = {
  commandName: undefined,
  options: {
    enableDevIcons: false,
    currentFilePath: "",
  },
  extra: {},
}

export const executeCommandModule = createSlice({
  name: EXECUTE_COMMAND,
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
      { payload }: PayloadAction<{ commandName: FzfPreviewCommandList; options: State["options"] }>
    ) => {
      const { commandName, options } = payload
      state.commandName = commandName
      state.options = options
    },
    setExtraCommandGrep: (state, { payload }: PayloadAction<{ defaultQuery: string }>) => {
      const { defaultQuery } = payload
      state.extra.commandGrep = { defaultQuery }
    },
  },
})

import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { VimValue } from "neovim/lib/types/VimValue"

import type { GlobalVariableName } from "@/type"
import type { Store } from "@/store"
import { VIM_VARIABLE } from "@/const/module"

type State = {
  global: {
    [key in GlobalVariableName]: VimValue
  }
}

type GlobalVariable = {
  name: keyof State["global"]
  value: VimValue
}

const initialState: State = {
  global: {
    fzfPreviewUseDevIcons: false,
    fzfPreviewDevIconPrefixStringLength: 0,
    fzfPreviewCommand: "",
    fzfPreviewFilelistCommand: "",
    fzfPreviewGitStatusCommand: "",
    fzfPreviewGitStatusPreviewCommand: "",
    fzfPreviewDirectoryFilesCommand: ""
  }
}

export const vimVariableModule = createSlice({
  name: VIM_VARIABLE,
  initialState,
  reducers: {
    restore: (state, { payload }: PayloadAction<State | undefined>) => {
      if (payload) {
        return { ...state, ...payload }
      }
      return state
    },
    setGlobalVariable: (state, { payload }: PayloadAction<GlobalVariable>) => {
      state.global[payload.name] = payload.value
    }
  }
})

export const createGlobalVariableSelector = (store: Store) => (name: GlobalVariableName) =>
  store.getState().vimVariable.global[name]

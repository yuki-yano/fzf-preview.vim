import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { VimValue } from "neovim/lib/types/VimValue"

import { VIM_VARIABLE } from "@/const/module"
import type { Store } from "@/store"
import type { GlobalVariableName } from "@/type"

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
    fzfPreviewGitFilesCommand: "",
    fzfPreviewDirectoryFilesCommand: "",
    fzfPreviewGitStatusCommand: "",
    fzfPreviewGitStatusPreviewCommand: "",
    fzfPreviewCacheDirectory: "",
    fzfPreviewLinesCommand: "",
    fzfPreviewGrepPreviewCmd: ""
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

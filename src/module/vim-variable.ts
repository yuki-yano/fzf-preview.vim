import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { VimValue } from "neovim/lib/types/VimValue"

import type { GlobalVariableName } from "@/type"
import type { RootState } from "@/reducer"

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
    fzfPreviewCommand: "bat --color=always --style=grid {-1}",
    fzfPreviewFilelistCommand: "git ls-files --exclude-standard"
  }
}

export const vimVariableModule = createSlice({
  name: "vim_variable",
  initialState,
  reducers: {
    setGlobalVariable: (state, { payload }: PayloadAction<GlobalVariable>) => {
      state.global[payload.name] = payload.value
    }
  }
})

export const createGlobalVariableSelector = (state: RootState) => (name: GlobalVariableName) => {
  return state.vimVariable.global[name]
}

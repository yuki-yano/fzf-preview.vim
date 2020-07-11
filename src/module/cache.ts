import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { CACHE } from "@/const/module"

export type State = {
  projectRoot: string
  mruFiles: Array<string>
  projectMruFiles: Array<string>
  mrwFiles: Array<string>
  projectMrwFiles: Array<string>
}

const initialState: State = {
  projectRoot: "",
  mruFiles: [],
  projectMruFiles: [],
  mrwFiles: [],
  projectMrwFiles: [],
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
    setProjectRoot: (state, { payload }: PayloadAction<{ projectRoot: string }>) => {
      state.projectRoot = payload.projectRoot
    },
    setMruFiles: (state, { payload }: PayloadAction<{ mruFiles: Array<string> }>) => {
      state.mruFiles = payload.mruFiles
    },
    setProjectMruFiles: (state, { payload }: PayloadAction<{ projectMruFiles: Array<string> }>) => {
      state.projectMruFiles = payload.projectMruFiles
    },
    setMrwFiles: (state, { payload }: PayloadAction<{ mrwFiles: Array<string> }>) => {
      state.mrwFiles = payload.mrwFiles
    },
    setProjectMrwFiles: (state, { payload }: PayloadAction<{ projectMrwFiles: Array<string> }>) => {
      state.projectMrwFiles = payload.projectMrwFiles
    },
  },
})

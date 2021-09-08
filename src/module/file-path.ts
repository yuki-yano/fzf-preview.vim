import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"

import { FILE_PATH } from "@/const/module"

export type State = {
  [filePath in string]: {
    relativePath?: string
  }
}

const initialState: State = {}

export const filePathModule = createSlice({
  name: FILE_PATH,
  initialState,
  reducers: {
    registerRelativePath: (state, { payload }: PayloadAction<{ absolutePath: string; relativePath: string }>) => {
      state[payload.absolutePath] = { relativePath: payload.relativePath }
    },
  },
})

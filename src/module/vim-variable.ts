import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { VimValue } from "neovim/lib/types/VimValue"

import { VIM_VARIABLE } from "@/const/module"
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
    fzfPreviewGrepCmd: "",
    fzfPreviewCacheDirectory: "",
    fzfPreviewLinesCommand: "",
    fzfPreviewGrepPreviewCmd: "",
    fzfPreviewCustomOpenFileProcesses: 0,
    fzfPreviewBuffersJump: 0
  }
}

type CustomProcesses = {
  [key: string]: string
}

const replaceProcessesExpectKey = (customProcesses: CustomProcesses) => {
  const processes = { ...customProcesses }
  if (processes[""] != null && processes.enter == null) {
    processes.enter = processes[""]
  }
  delete processes[""]
  return processes
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
      const { name, value } = payload

      switch (name) {
        case "fzfPreviewCustomOpenFileProcesses": {
          if (typeof value === "object") {
            state.global[name] = replaceProcessesExpectKey(value as CustomProcesses)
          } else {
            state.global[name] = value
          }
          break
        }

        default: {
          state.global[name] = value
        }
      }
    }
  }
})

import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { mapKeys, mapValues } from "lodash"
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
    fzfPreviewDefaultFzfOptions: {},
    fzfPreviewUseDevIcons: false,
    fzfPreviewDevIconPrefixStringLength: 0,
    fzfPreviewDevIconsLimit: 5000,
    webDevIconsUnicodeDecorateFileNodesDefaultSymbol: " ",
    webDevIconsUnicodeDecorateFileNodesExtensionSymbols: {},
    webDevIconsUnicodeDecorateFileNodesExactSymbols: {},
    webDevIconsUnicodeDecorateFileNodesPatternSymbols: {},
    fzfPreviewCommand: "",
    fzfBinaryPreviewCommand: "",
    fzfPreviewIfBinaryCommand: "",
    fzfPreviewFilelistCommand: "",
    fzfPreviewGitFilesCommand: "",
    fzfPreviewDirectoryFilesCommand: "",
    fzfPreviewGitStatusCommand: "",
    fzfPreviewGitStatusPreviewCommand: "",
    fzfPreviewGrepCmd: "",
    fzfPreviewScriptDir: "",
    fzfPreviewCacheDirectory: "",
    fzfPreviewLinesCommand: "",
    fzfPreviewGrepPreviewCmd: "",
    fzfPreviewCustomProcesses: {},
    fzfPreviewFzfPreviewWindowOption: "",
    fzfPreviewFzfColorOption: "",
    fzfPreviewBuffersJump: 0,
    fzfPreviewYankroundPreviewCommand: "",
    fzfPreviewBlamePrCommand: "",
  },
}

type CustomProcesses = {
  [key: string]: string
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
        case "fzfPreviewCustomProcesses": {
          if (typeof value === "object" && !Array.isArray(value)) {
            const customProcessesDictionary = mapValues(
              value as { [key: string]: CustomProcesses },
              (processes: CustomProcesses) =>
                mapKeys(processes, (_, expectKey) => (expectKey === "" ? "enter" : expectKey))
            )

            state.global.fzfPreviewCustomProcesses = customProcessesDictionary
          } else {
            throw new Error("fzf_preview_custom_processes must be Dictionary variable")
          }
          break
        }

        default: {
          state.global[name] = value
        }
      }
    },
  },
})

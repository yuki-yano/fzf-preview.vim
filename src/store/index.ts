import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"

import { executeCommandModule } from "@/module/execute-command"
import { filePathModule } from "@/module/file-path"
import { gitConfigModule } from "@/module/git-config"
import { recallModule } from "@/module/recall"
import { resumeModule } from "@/module/resume"
import { sessionModule } from "@/module/session"
import { vimVariableModule } from "@/module/vim-variable"

const setupStore = () => {
  const store = configureStore({
    reducer: {
      vimVariable: vimVariableModule.reducer,
      executeCommand: executeCommandModule.reducer,
      resume: resumeModule.reducer,
      session: sessionModule.reducer,
      gitConfig: gitConfigModule.reducer,
      recall: recallModule.reducer,
      filePath: filePathModule.reducer,
    },
    middleware: getDefaultMiddleware(),
  })

  return store
}

export const store = setupStore()
export const { dispatch } = store

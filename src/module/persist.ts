import { createAsyncThunk } from "@reduxjs/toolkit"

import {
  PERSIST_LOAD_GIT_CONFIG,
  PERSIST_LOAD_RESUME,
  PERSIST_LOAD_SESSION,
  PERSIST_LOAD_STORE,
  PERSIST_SAVE_STORE,
} from "@/const/module"
import { executeCommandModule } from "@/module/execute-command"
import { gitConfigModule } from "@/module/git-config"
import { resumeModule } from "@/module/resume"
import { sessionModule } from "@/module/session"
import { pluginCall } from "@/plugin"
import type { AppDispatch, RootState, store } from "@/store"

type Module = keyof ReturnType<typeof store.getState>

export const loadExecuteCommandStore = createAsyncThunk<void, undefined, { dispatch: AppDispatch; state: RootState }>(
  PERSIST_LOAD_STORE,
  async (_: undefined, { dispatch }) => {
    const restoredStore: Partial<RootState> = (await pluginCall("fzf_preview#remote#store#restore_store")) as Partial<
      RootState
    >
    dispatch(executeCommandModule.actions.restore(restoredStore.executeCommand))
  }
)

export const loadResume = createAsyncThunk<void, undefined, { dispatch: AppDispatch; state: RootState }>(
  PERSIST_LOAD_RESUME,
  async (_: undefined, { dispatch }) => {
    const restoredStore: Partial<RootState> = (await pluginCall("fzf_preview#remote#store#restore_store")) as Partial<
      RootState
    >
    dispatch(resumeModule.actions.restore(restoredStore.resume))
  }
)

export const loadSession = createAsyncThunk<void, undefined, { dispatch: AppDispatch; state: RootState }>(
  PERSIST_LOAD_SESSION,
  async (_: undefined, { dispatch }) => {
    const restoredStore: Partial<RootState> = (await pluginCall("fzf_preview#remote#store#restore_store")) as Partial<
      RootState
    >
    dispatch(sessionModule.actions.restore(restoredStore.session))
  }
)

export const loadGitConfig = createAsyncThunk<void, undefined, { dispatch: AppDispatch; state: RootState }>(
  PERSIST_LOAD_GIT_CONFIG,
  async (_: undefined, { dispatch }) => {
    const restoredStore: Partial<RootState> = (await pluginCall("fzf_preview#remote#store#restore_store")) as Partial<
      RootState
    >
    dispatch(gitConfigModule.actions.restore(restoredStore.gitConfig))
  }
)

export const saveStore = createAsyncThunk<
  void,
  { modules: Array<Module> },
  { dispatch: AppDispatch; state: RootState }
>(PERSIST_SAVE_STORE, async ({ modules }, { getState }) => {
  await Promise.all(
    modules.map(async (module) => {
      await pluginCall("fzf_preview#remote#store#persist_store", [getState()[module], module])
    })
  )
})

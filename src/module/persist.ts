import { createAsyncThunk } from "@reduxjs/toolkit"

import { PERSIST_LOAD_CACHE, PERSIST_LOAD_RESUME, PERSIST_LOAD_STORE, PERSIST_SAVE_STORE } from "@/const/module"
import { cacheModule } from "@/module/cache"
import { executeCommandModule } from "@/module/execute-command"
import { resumeModule } from "@/module/resume"
import { pluginCall } from "@/plugin"
import type { AppDispatch, RootState } from "@/store"

type Modules = ["vimVariable", "executeCommand", "cache", "resume"]

export const loadExecuteCommandStore = createAsyncThunk<void, undefined, { dispatch: AppDispatch; state: RootState }>(
  PERSIST_LOAD_STORE,
  async (_: undefined, { dispatch }) => {
    const restoredStore: Partial<RootState> = (await pluginCall("fzf_preview#remote#store#restore_store")) as Partial<
      RootState
    >
    dispatch(executeCommandModule.actions.restore(restoredStore.executeCommand))
  }
)

export const loadCache = createAsyncThunk<void, undefined, { dispatch: AppDispatch; state: RootState }>(
  PERSIST_LOAD_CACHE,
  async (_: undefined, { dispatch }) => {
    const restoredStore: Partial<RootState> = (await pluginCall("fzf_preview#remote#store#restore_store")) as Partial<
      RootState
    >
    dispatch(cacheModule.actions.restore(restoredStore.cache))
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

export const saveStore = createAsyncThunk<
  void,
  { modules: Array<Modules[number]> },
  { dispatch: AppDispatch; state: RootState }
>(PERSIST_SAVE_STORE, async ({ modules }, { getState }) => {
  await Promise.all(
    modules.map(async (module) => {
      await pluginCall("fzf_preview#remote#store#persist_store", [getState()[module], module])
    })
  )
})

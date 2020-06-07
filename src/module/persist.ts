import { createAsyncThunk } from "@reduxjs/toolkit"

import type { RootState, AppDispatch } from "@/store"
import { pluginCall } from "@/plugin"
import { vimVariableModule } from "@/module/vim-variable"
import { executeCommandModule } from "@/module/execute-command"
import { PERSIST_LOAD_STORE, PERSIST_SAVE_STORE } from "@/const/module"

export const loadStore = createAsyncThunk<void, undefined, { dispatch: AppDispatch; state: RootState }>(
  PERSIST_LOAD_STORE,
  async (_: undefined, { dispatch }) => {
    const restoredStore: Partial<RootState> = await pluginCall("fzf_preview#remote#store#restore_store")
    dispatch(vimVariableModule.actions.restore(restoredStore.vimVariable))
    dispatch(executeCommandModule.actions.restore(restoredStore.executeCommand))
  }
)

export const saveStore = createAsyncThunk<void, undefined, { dispatch: AppDispatch; state: RootState }>(
  PERSIST_SAVE_STORE,
  async (_: undefined, { getState }) => {
    await pluginCall("fzf_preview#remote#store#persist_store", getState())
  }
)

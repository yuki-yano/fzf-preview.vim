import { Middleware, MiddlewareAPI, Dispatch, AnyAction } from "redux"

import type { RootState } from "@/store"
import { pluginCall } from "@/plugin"
import { vimVariableModule } from "@/module/vim-variable"
import { executeCommandModule } from "@/module/execute-command"
import { persistModule } from "@/module/persist"

export const neovimStoreMiddleware: Middleware<{}, RootState, Dispatch> = ({
  getState,
  dispatch
}: MiddlewareAPI<Dispatch, RootState>) => (next: Dispatch<AnyAction>) => async (action: AnyAction) => {
  if ((action as typeof persistModule["actions"]["restoreStore"]).type === persistModule.actions.restoreStore.type) {
    const restoredStore: Partial<RootState> = await pluginCall("fzf_preview#remote#store#restore_store")
    dispatch(vimVariableModule.actions.restore(restoredStore.vimVariable))
    dispatch(executeCommandModule.actions.restore(restoredStore.executeCommand))
  }

  if ((action as typeof persistModule["actions"]["persistStore"]).type === persistModule.actions.persistStore.type) {
    await pluginCall("fzf_preview#remote#store#persist_store", getState())
  }

  return next(action)
}

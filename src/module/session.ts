import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import { castDraft, createDraft } from "immer"

import { SESSION } from "@/const/module"
import type { Session, SessionToken } from "@/type"

type State = {
  currentSession?: Session
  sessions: {
    [key in SessionToken]: Session
  }
}

const initialState: State = {
  sessions: {},
}

export const sessionModule = createSlice({
  name: SESSION,
  initialState,
  reducers: {
    restore: (state, { payload }: PayloadAction<State | undefined>) => {
      if (payload != null) {
        // NOTE: Not run createDraft on the payload, the state will not work properly on other actions.
        //       or not use createDraft and `state = payload` (not want use it)
        const { sessions, currentSession } = createDraft(payload)
        state.sessions = sessions
        state.currentSession = currentSession
      }
    },
    setSession: (state, { payload }: PayloadAction<{ sessionToken: SessionToken; session: Session }>) => {
      state.sessions[payload.sessionToken] = castDraft(payload.session)
      state.currentSession = undefined
    },
    setCurrentSession: (state, { payload }: PayloadAction<{ session: Session }>) => {
      state.currentSession = castDraft(payload.session)
    },
    clearCurrentSession: (state, _: PayloadAction<undefined>) => {
      state.currentSession = undefined
    },
  },
})

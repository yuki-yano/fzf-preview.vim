import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { SESSION } from "@/const/module"
import type { Session } from "@/type"

type SessionToken = string

export type State = {
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
      if (payload) {
        return { ...state, ...payload }
      }
      return state
    },
    setSession: (state, { payload }: PayloadAction<{ sessionToken: string; session: Session }>) => {
      state.sessions[payload.sessionToken] = payload.session
      state.currentSession = undefined
    },
    setCurrentSession: (state, { payload }: PayloadAction<{ session: Session }>) => {
      state.currentSession = payload.session
    },
    clearCurrentSession: (state, _: PayloadAction<undefined>) => {
      state.currentSession = undefined
    },
  },
})

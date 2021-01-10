import { store } from "@/store"
import type { Session, SessionToken } from "@/type"

export const sessionSelector = (sessionToken: SessionToken): Session | null =>
  store.getState().session.sessions[sessionToken] ?? null

export const currentSessionSelector = (): Session | null => store.getState().session.currentSession ?? null

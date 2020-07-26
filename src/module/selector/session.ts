import { store } from "@/store"
import type { Session } from "@/type"

export const sessionSelector = (sessionToken: string): Session | undefined =>
  store.getState().session.sessions[sessionToken]

export const currentSessionSelector = (): Session | undefined => store.getState().session.currentSession

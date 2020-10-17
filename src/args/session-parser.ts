import { argsParser } from "@/args/parser"
import { loadSession } from "@/module/persist"
import { sessionSelector } from "@/module/selector/session"
import { dispatch } from "@/store"
import type { Session } from "@/type"

export const parseSession = async (args: string): Promise<Session | null> => {
  const parser = argsParser()
  const options = parser.parse(args)

  if (options.session == null) {
    return null
  }

  await dispatch(loadSession())

  const sessionToken = options.session as string
  const currentSession = sessionSelector(sessionToken)

  if (currentSession == null) {
    throw new Error(`Invalid session token: ${sessionToken}`)
  }

  return currentSession
}

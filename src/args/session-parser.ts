import { argsParser } from "@/args/parser"
import { sessionSelector } from "@/module/selector/session"
import type { Session } from "@/type"

export const parseSession = (args: string): Session | null => {
  const parser = argsParser()
  const options = parser.parseSync(args)

  if (options.session == null) {
    return null
  }

  const sessionToken = options.session
  const currentSession = sessionSelector(sessionToken)

  if (currentSession == null) {
    throw new Error(`Invalid session token: ${sessionToken}`)
  }

  return currentSession
}

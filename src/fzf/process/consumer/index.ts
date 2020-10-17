import { v4 as uuidv4 } from "uuid"

import { execFzfCommand } from "@/connector/fzf"
import { saveStore } from "@/module/persist"
import { sessionModule } from "@/module/session"
import { dispatch } from "@/store"
import type { CallbackLine, FzfCommandName, ResourceData, Session } from "@/type"

export const decodeLine = (callbackLine: CallbackLine): ResourceData => {
  return JSON.parse(decodeURIComponent(callbackLine.trim().split(" ")[0])) as ResourceData
}

export const createSingleLineConsumer = (consume: (data: ResourceData) => Promise<void>) =>
  ({
    consume,
    kind: "single",
  } as const)

export const createBulkLineConsumer = (consume: (dataList: Array<ResourceData>) => Promise<void>) =>
  ({
    consume,
    kind: "bulk",
  } as const)

export const chainFzfCommand = async (fzfCommandName: FzfCommandName, session?: Session): Promise<void> => {
  if (session == null) {
    await execFzfCommand(fzfCommandName, { clearSession: true })
  } else {
    const sessionToken = uuidv4()
    dispatch(sessionModule.actions.setSession({ session, sessionToken }))
    await dispatch(saveStore({ modules: ["session"] }))
    await execFzfCommand(fzfCommandName, { sessionToken })
  }
}

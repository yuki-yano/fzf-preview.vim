import { HANDLER_NAME } from "@/const/fzf-handler"
import { callProcess } from "@/fzf/handler"
import { pluginRegisterFunction } from "@/plugin"

export const registerHandlers = (): void => {
  pluginRegisterFunction(HANDLER_NAME, callProcess, { sync: true })
}

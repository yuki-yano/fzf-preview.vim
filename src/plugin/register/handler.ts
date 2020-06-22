import { handlerName } from "@/const/fzf-handler"
import { callProcess } from "@/fzf/handler"
import { pluginRegisterFunction } from "@/plugin"

export const registerHandlers = (): void => {
  pluginRegisterFunction(handlerName, callProcess, { sync: true })
}

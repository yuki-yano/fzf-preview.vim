import { handlerName } from "@/const/fzf-handler"
import { callProcess } from "@/fzf/handler"
import { pluginRegisterFunction } from "@/plugin"

export const registerHandlers = () => {
  pluginRegisterFunction(handlerName, callProcess, { sync: true })
}

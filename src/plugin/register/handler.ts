import { pluginRegisterFunction } from "@/plugin"
import { callProcessor } from "@/fzf/handler"
import { handlerName } from "@/const/fzf-handler"

export const registerHandlers = () => {
  pluginRegisterFunction(handlerName, callProcessor)
}

import { handlerName } from "@/const/fzf-handler"
import { callProcessor } from "@/fzf/handler"
import { pluginRegisterFunction } from "@/plugin"

export const registerHandlers = () => {
  pluginRegisterFunction(handlerName, callProcessor, { sync: true })
}

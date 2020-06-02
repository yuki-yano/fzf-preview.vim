import { pluginRegisterFunction } from "@/plugin"
import { commandDefinition } from "@/association/command"

export const registerHandler = () => {
  commandDefinition.forEach(({ handlerName, handlerFunction }) => {
    pluginRegisterFunction(handlerName, handlerFunction)
  })
}

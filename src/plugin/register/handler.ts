import { pluginRegisterFunction } from "@/plugin"
import { commandDefinition } from "@/association/command"

export const registerHandlers = () => {
  commandDefinition.forEach(({ handlerName, handlerFunction }) => {
    pluginRegisterFunction(handlerName, handlerFunction)
  })
}

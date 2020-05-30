import { plugin } from ".."
import { commandDefinition } from "../../association/command"

export const registerHandler = () => {
  commandDefinition.forEach(({ handlerName, handlerFunction }) => {
    plugin.registerFunction(handlerName, handlerFunction)
  })
}

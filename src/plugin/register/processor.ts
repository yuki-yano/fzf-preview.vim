import { pluginRegisterFunction } from "@/plugin"
import { commandDefinition } from "@/association/command"

export const registerProcessors = () => {
  commandDefinition.forEach(({ commandName, defaultProcessors }) => {
    Object.entries(defaultProcessors).forEach(([key, value]) => {
      pluginRegisterFunction(`${commandName}_${key}`, value, { sync: true })
    })
  })
}

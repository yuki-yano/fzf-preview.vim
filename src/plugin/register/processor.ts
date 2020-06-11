import { commandDefinition } from "@/association/command"
import { createProcessorsFunctionName } from "@/fzf/processor"
import { pluginRegisterFunction } from "@/plugin"

export const registerProcessors = () => {
  commandDefinition.forEach(({ commandName, defaultProcessors }) => {
    Object.entries(defaultProcessors).forEach(([expectKey, processor]) => {
      pluginRegisterFunction(createProcessorsFunctionName(commandName, expectKey), processor, { sync: false })
    })
  })
}

import { saveStore } from "@/module/persist"
import { resumeModule } from "@/module/resume"
import { pluginCall } from "@/plugin"
import { dispatch } from "@/store"
import type { FzfPreviewCommandList } from "@/type"

export const setResourceCommandName = async (commandName: string): Promise<void> => {
  await pluginCall("fzf_preview#remote#window#set_resource_command_name", [commandName])
}

export const dispatchResumeQuery = async ([commandName, query]: [FzfPreviewCommandList, string]): Promise<void> => {
  dispatch(resumeModule.actions.setQuery({ commandName, query }))
  await dispatch(saveStore({ modules: ["resume"] }))
}

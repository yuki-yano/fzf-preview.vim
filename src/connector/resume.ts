import { resumeModule } from "@/module/resume"
import { pluginCall } from "@/plugin"
import { dispatch } from "@/store"
import type { FzfPreviewCommandList } from "@/type"

export const setResourceCommandName = async (commandName: string): Promise<void> => {
  await pluginCall("fzf_preview#remote#window#set_resource_command_name", [commandName])
}

export const dispatchResumeQuery = ([commandName, query]: [FzfPreviewCommandList, string]): void => {
  if (commandName === "FzfPreviewProjectGrep") {
    dispatch(resumeModule.actions.setQuery({ commandName: "FzfPreviewProjectGrepRecall", query }))
  }
  dispatch(resumeModule.actions.setQuery({ commandName, query }))
}

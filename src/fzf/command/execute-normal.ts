import { convertForFzf } from "@/connector/convert-for-fzf"
import { setResourceCommandName } from "@/connector/resume"
import { HANDLER_NAME } from "@/const/fzf-handler"
import { getEnableDevIcons } from "@/fzf/command/util"
import { generateOptions } from "@/fzf/option/generator"
import { executeCommandModule } from "@/module/execute-command"
import { fzfRunner } from "@/plugin/fzf-runner"
import { dispatch } from "@/store"
import { getCurrentFilePath } from "@/system/file"
import type { ExecuteArgs } from "@/type"

export const executeNormal = async ({
  sourceFunc,
  sourceFuncArgs,
  enableDevIconsCommandSetting,
  commandName,
  userProcesses,
  fzfCommandDefaultOptions,
  defaultProcesses,
  addFzfOptions,
  historyOption,
  resumeQuery,
  enableConvertForFzf,
}: ExecuteArgs): Promise<void> => {
  const resource = await sourceFunc(sourceFuncArgs)
  const enableDevIcons = getEnableDevIcons(resource.lines, enableDevIconsCommandSetting)

  // For execute and display
  dispatch(
    executeCommandModule.actions.setExecuteCommand({
      commandName,
      options: {
        userProcesses,
        enableDevIcons,
        currentFilePath: await getCurrentFilePath(),
      },
    })
  )

  // For resume option
  await setResourceCommandName(commandName)

  const fzfOptions = await generateOptions({
    fzfCommandDefaultOptions,
    dynamicOptions: resource.options,
    defaultProcesses,
    userProcesses,
    userOptions: addFzfOptions,
    historyOption,
    resumeQuery,
  })

  const resourceForFzf = convertForFzf(resource.lines, {
    enableConvertForFzf,
    enableDevIcons,
  })

  await fzfRunner({
    resourceLines: resourceForFzf,
    handler: HANDLER_NAME,
    options: fzfOptions,
  })
}

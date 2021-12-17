import fs from "fs"

import { convertForFzf } from "@/connector/convert-for-fzf"
import { setResourceCommandName } from "@/connector/resume"
import { HANDLER_NAME } from "@/const/fzf-handler"
import { TAIL_RESOURCE_FILE_COMMAND } from "@/const/fzf-runner"
import { TEMPORALLY_DATA_FILE_PATH } from "@/const/system"
import { getEnableDevIcons } from "@/fzf/command/util"
import { fzfOptionsToString } from "@/fzf/option/convert"
import { generateOptions } from "@/fzf/option/generator"
import { executeCommandModule } from "@/module/execute-command"
import { pluginCall } from "@/plugin"
import { resourceLineToFzfLine } from "@/plugin/fzf-runner"
import { dispatch } from "@/store"
import { getCurrentFilePath } from "@/system/file"
import type { ExecuteArgs } from "@/type"

export const executeExperimentalFast = async ({
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
  const fzfOptions = await generateOptions({
    fzfCommandDefaultOptions,
    dynamicOptions: undefined,
    defaultProcesses,
    userProcesses,
    userOptions: addFzfOptions,
    historyOption,
    resumeQuery,
  })

  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  pluginCall("fzf_preview#remote#runner#fzf_run", {
    source: TAIL_RESOURCE_FILE_COMMAND,
    handler: HANDLER_NAME,
    options: fzfOptionsToString(fzfOptions),
    environment: PLUGIN.ENV,
  })

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

  const fd = fs.openSync(TEMPORALLY_DATA_FILE_PATH, "a")

  const lines = convertForFzf(resource.lines, {
    enableConvertForFzf,
    enableDevIcons,
  })

  for (const line of lines) {
    fs.appendFileSync(fd, `${resourceLineToFzfLine(line)}\n`)
  }

  fs.closeSync(fd)
}

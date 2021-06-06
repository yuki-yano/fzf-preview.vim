import type { cocCommandDefinition } from "@/association/coc-command"
import type {
  AddFzfArg,
  FzfCommandName,
  FzfOptions,
  Processes,
  Resource,
  ResumeQuery,
  SourceFuncArgs,
  UserProcesses,
} from "@/type"

export type FzfPreviewCommandList = typeof cocCommandDefinition[number]["commandName"]
export type ExecuteArgs = {
  sourceFunc: (args: SourceFuncArgs) => Promise<Resource>
  sourceFuncArgs: SourceFuncArgs
  enableDevIconsCommandSetting: boolean
  commandName: FzfCommandName
  userProcesses?: UserProcesses
  fzfCommandDefaultOptions: FzfOptions
  defaultProcesses: Processes
  addFzfOptions: ReadonlyArray<AddFzfArg>
  historyOption: {
    commandName: string
    historyDir: string | false
  }
  resumeQuery?: ResumeQuery
  enableConvertForFzf: boolean
}

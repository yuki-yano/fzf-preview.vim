import { parseGrepArgs } from "@/args"
import { execGrep } from "@/connector/grep"
import { executeCommandModule } from "@/module/execute-command"
import { executeCommandSelector } from "@/module/selector/execute-command"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import { dispatch } from "@/store"
import type { FzfCommandDefinitionDefaultOption, ResourceLines, SourceFuncArgs } from "@/type"

const defaultQuery = () => {
  const executeCommandExtra = executeCommandSelector().extra
  if (executeCommandExtra.commandGrep) {
    return executeCommandExtra.commandGrep.defaultQuery
  } else {
    return ""
  }
}

// eslint-disable-next-line @typescript-eslint/require-await
export const projectCommandGrep = async (_args: SourceFuncArgs): Promise<ResourceLines> => {
  const grepArgs = defaultQuery() === "" ? "." : defaultQuery()
  return execGrep(grepArgs)
}

const previewCommand = () => {
  const grepPreviewCommand = globalVariableSelector("fzfPreviewGrepPreviewCmd") as string
  return `"${grepPreviewCommand} {}"`
}

export const projectCommandGrepDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"ProjectCommandGrep> "',
  "--multi": true,
  "--preview": previewCommand(),
  "--no-sort": true,
  "--delimiter": ":",
  "--phony": true,
  // TODO: merge default bind settings
  "--bind": `change:reload:"${globalVariableSelector("fzfPreviewGrepCmd") as string} {q} || true"`,
  "--query": `"${defaultQuery()}"`,
})

export const dispatchDefaultQueryForCommandGrep = (args: string): void => {
  dispatch(executeCommandModule.actions.setExtraCommandGrep({ defaultQuery: parseGrepArgs(args).args.join(" ") }))
}

import { getChanges } from "@/connector/changes"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import { currentFilePath } from "@/system/file"
import type { FzfCommandDefinitionDefaultOption, ResourceLines, SourceFuncArgs } from "@/type"
import { alignLists } from "@/util/align"

const SPACER = "  "

export const changes = async (_args: SourceFuncArgs): Promise<ResourceLines> => {
  const changeLists = (await getChanges()).map((change) => {
    const result = /^(?<lineNumber>\d+)\s(?<text>.*)/.exec(change)

    if (result == null || result.groups == null) {
      throw new Error(`Changes line is invalid: "${change}"`)
    }
    const { lineNumber, text } = result.groups
    return [lineNumber, text]
  })

  return alignLists(changeLists).map((change) => change.join(SPACER).trim())
}

const previewCommand = async () => {
  const grepPreviewCommand = globalVariableSelector("fzfPreviewGrepPreviewCmd") as string
  return `"${grepPreviewCommand} ${await currentFilePath()}:{}"`
}

export const changesDefaultOptions = async (): Promise<FzfCommandDefinitionDefaultOption> => ({
  "--prompt": '"Changes> "',
  "--multi": true,
  "--preview": await previewCommand()
})
